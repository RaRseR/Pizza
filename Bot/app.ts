import { App } from "@slack/bolt";
require("dotenv").config();

import {
    header,
    title,
    size,
    dough,
    border,
    supplements,
    address,
    comment,
} from "./messages";

import amqplib from "amqplib";

const port = process.env.port;
const rabbit = process.env.rabbit;

const bot = new App({
    token: process.env.TOKEN,
    signingSecret: process.env.SIGNING_SECRET,
    socketMode: true,
    appToken: process.env.APP_TOKEN,
});

bot.command("/заказать", async ({ ack, body, client }) => {
    await ack();

    try {
        await client.views.open({
            trigger_id: body.trigger_id,

            view: {
                type: "modal",
                callback_id: "pizza_view",
                title: {
                    type: "plain_text",
                    text: "Пицца",
                },
                blocks: [
                    header,
                    title,
                    size,
                    dough,
                    border,
                    supplements,
                    address,
                    comment,
                ],
                submit: {
                    type: "plain_text",
                    text: "Заказать",
                },
            },
        });
    } catch (error) {
        console.error(error);
    }
});

bot.view("pizza_view", async ({ ack, body, view, client }) => {
    try {
        await ack();

        const user = body.user;

        const order: IOrder = {
            title: view.state.values.title_block.title.value,
            size: view.state.values.size_block.size.selected_option!.value,
            dough: view.state.values.dough_block.dough.selected_option!.value,
            border: view.state.values.border_block.border.selected_option!
                .value,
            address: view.state.values.address_block.address.value,
            supplements: view.state.values.supplements_block.supplements.value,
            comment: view.state.values.comment_block.comment.value,
            user: user,
        };

        makeOrder(order);

        await client.chat.postMessage({
            channel: user.id,
            text: "Заказ оформлен",
        });
    } catch (error) {
        console.error(error);
    }
});

async function makeOrder(order: IOrder) {
    const queue = "orders";

    const conn = await amqplib.connect(rabbit);

    const channel = await conn.createChannel();
    const channel2 = await conn.createChannel();

    channel.sendToQueue(queue, Buffer.from(JSON.stringify(order)));
}

(async () => {
    const queue = "chat";

    const conn = await amqplib.connect(rabbit);

    const channel = await conn.createChannel();
    await channel.assertQueue(queue);

    channel.consume(queue, async (msg) => {
        if (msg !== null) {
            channel.ack(msg);

            const { user, text } = JSON.parse(msg.content.toString());

            await bot.client.chat.postMessage({
                channel: user,
                text,
            });
        } else {
            console.log("Cancelled");
        }
    });
})();

(async () => {
    await bot.start(port);
    console.log(`⚡️ Slack Bolt app is running on port ${port}!`);
})();

interface IOrder {
    title: string;
    size: string;
    dough: string;
    border: string;
    address: string;
    supplements: string;
    comment: string;
    user: { id: string; name: string; team_id?: string };
}
