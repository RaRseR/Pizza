"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bolt_1 = require("@slack/bolt");
require("dotenv").config();
const messages_1 = require("./messages");
const amqplib_1 = __importDefault(require("amqplib"));
const port = process.env.port;
const rabbit = process.env.rabbit;
const bot = new bolt_1.App({
    token: process.env.TOKEN,
    signingSecret: process.env.SIGNING_SECRET,
    socketMode: true,
    appToken: process.env.APP_TOKEN,
});
bot.command("/заказать", ({ ack, body, client }) => __awaiter(void 0, void 0, void 0, function* () {
    yield ack();
    try {
        yield client.views.open({
            trigger_id: body.trigger_id,
            view: {
                type: "modal",
                callback_id: "pizza_view",
                title: {
                    type: "plain_text",
                    text: "Пицца",
                },
                blocks: [
                    messages_1.header,
                    messages_1.title,
                    messages_1.size,
                    messages_1.dough,
                    messages_1.border,
                    messages_1.supplements,
                    messages_1.address,
                    messages_1.comment,
                ],
                submit: {
                    type: "plain_text",
                    text: "Заказать",
                },
            },
        });
    }
    catch (error) {
        console.error(error);
    }
}));
bot.view("pizza_view", ({ ack, body, view, client }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield ack();
        const user = body.user;
        const order = {
            title: view.state.values.title_block.title.value,
            size: view.state.values.size_block.size.selected_option.value,
            dough: view.state.values.dough_block.dough.selected_option.value,
            border: view.state.values.border_block.border.selected_option
                .value,
            address: view.state.values.address_block.address.value,
            supplements: view.state.values.supplements_block.supplements.value,
            comment: view.state.values.comment_block.comment.value,
            user: user,
        };
        makeOrder(order);
        yield client.chat.postMessage({
            channel: user.id,
            text: "Заказ оформлен",
        });
    }
    catch (error) {
        console.error(error);
    }
}));
function makeOrder(order) {
    return __awaiter(this, void 0, void 0, function* () {
        const queue = "orders";
        const conn = yield amqplib_1.default.connect(rabbit);
        const channel = yield conn.createChannel();
        const channel2 = yield conn.createChannel();
        channel.sendToQueue(queue, Buffer.from(JSON.stringify(order)));
        const message = { user: order.user.id, text: "TEST" };
        channel2.sendToQueue("chat", Buffer.from(JSON.stringify(message)));
    });
}
(() => __awaiter(void 0, void 0, void 0, function* () {
    const queue = "chat";
    const conn = yield amqplib_1.default.connect(rabbit);
    const channel = yield conn.createChannel();
    yield channel.assertQueue(queue);
    channel.consume(queue, (msg) => __awaiter(void 0, void 0, void 0, function* () {
        if (msg !== null) {
            channel.ack(msg);
            const { user, text } = JSON.parse(msg.content.toString());
            yield bot.client.chat.postMessage({
                channel: user,
                text,
            });
        }
        else {
            console.log("Cancelled");
        }
    }));
}))();
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield bot.start(port);
    console.log(`⚡️ Slack Bolt app is running on port ${port}!`);
}))();
//# sourceMappingURL=app.js.map