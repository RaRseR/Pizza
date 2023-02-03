const express = require("express");
require('dotenv').config()

const MongoClient = require("mongodb").MongoClient;
import { ObjectId } from "mongodb";

const amqplib = require("amqplib");

const app = express();
const appFolder = "UI/dist/ui";

const port = process.env.PORT;
const rabbit = process.env.RABBIT;

const client = new MongoClient("mongodb://localhost:27017");

app.use(express.json());
app.use(express.static(appFolder));

app.get("/api/orders", async function (req, res) {
    try {
        const database = client.db("manager");
        const orders = database.collection("orders");

        const allOrders = await orders.find().sort({ status: 1 }).toArray();
        res.status(200).json(allOrders);
    } catch (error) {
        res.status(418).json();
        console.log(error);
    }
});

app.get("/api/chat", async function (req, res) {
    try {
        const database = client.db("manager");
        const chats = database.collection("chats");

        const allChats = await chats
            .find()
            .project({ messages: 0, _id: 0 })
            .toArray();

        res.status(200).json(allChats);
    } catch (error) {
        res.status(418).json();
        console.log(error);
    }
});

app.get("/api/chat/:id", async function (req, res) {
    const id = req.params.id;

    try {
        const database = client.db("manager");
        const chats = database.collection("chats");

        const chat = await chats.findOne(
            { id: id },
            { projection: { messages: 1, _id: 0 } }
        );

        res.status(200).json(chat.messages);
    } catch (error) {
        res.status(418).json();
        console.log(error);
    }
});

app.post("/api/change-status", async function (req, res) {
    const { id, status } = req.body;

    try {
        const database = client.db("manager");
        const orders = database.collection("orders");

        const result = await orders.findOneAndUpdate(
            { _id: new ObjectId(id) },
            { $set: { status } }
        );
        const order = result.value;

        const statuses = [
            "принято",
            "готовится",
            "в доставке",
            "доставлено",
            "отменено",
        ];

        const message: IMessage = {
            user: order.user.id,
            text: `Статус вашего заказа ${id} был изменен на "${statuses[status]}"`,
        };

        sendMessage(message);

        res.status(200).json();
    } catch (error) {
        res.status(418).json();
        console.log(error);
    }
});

app.post("/api/send-message", async function (req, res) {
    const data = req.body;

    const message: IMessage = {
        user: data.id,
        text: data.text,
    };

    sendMessage(message);

    res.status(200).json(data);
});

app.all("*", function (req, res) {
    res.status(200).sendFile(`/`, { root: appFolder });
});

(async () => {
    const orders = "orders";
    const chat = "chat";

    const conn = await amqplib.connect(rabbit);

    const channel1 = await conn.createChannel();
    await channel1.assertQueue(orders);

    channel1.consume(orders, (msg) => {
        if (msg !== null) {
            const order: IOrder = {
                status: 0,
                ...JSON.parse(msg.content.toString()),
            };

            saveOrder(order);

            channel1.ack(msg);
        } else {
            console.log("Consumer cancelled by server");
        }
    });

    const channel2 = await conn.createChannel();
    await channel2.assertQueue(chat);

    channel2.consume(chat, async (msg) => {
        if (msg !== null) {
            const message: IMessage = {
                ...JSON.parse(msg.content.toString()),
            };

            const database = client.db("manager");
            const chats = database.collection("chats");

            await chats.updateOne(
                { id: message.user },
                {
                    $push: { messages: { from: false, text: message.text } },
                },
                { upsert: true }
            );

            channel2.ack(msg);
        } else {
            console.log("Consumer cancelled by server");
        }
    });
})();

async function saveOrder(order: IOrder) {
    const database = client.db("manager");
    const orders = database.collection("orders");
    const chats = database.collection("chats");

    await orders.insertOne(order);

    await chats.updateOne(
        { id: order.user.id },
        {
            $setOnInsert: { user: order.user.name, messages: [] },
        },
        { upsert: true }
    );
}

async function sendMessage(message: IMessage) {
    const queue = "chat";

    const conn = await amqplib.connect(rabbit);

    const channel = await conn.createChannel();

    channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));

    const database = client.db("manager");
    const chats = database.collection("chats");

    await chats.updateOne(
        { id: message.user },
        {
            $push: {
                messages: { from: true, text: message.text },
            },
        },
        { upsert: true }
    );
}

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

interface IOrder {
    status: number;
    title: string;
    size: string;
    dough: string;
    border: string;
    address: string;
    supplements: string;
    comment: string;
    user: { id: string; name: string; team_id?: string };
}

interface IMessage {
    user: string;
    text: string;
}
