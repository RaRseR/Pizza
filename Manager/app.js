"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var express = require("express");
require('dotenv').config();
var MongoClient = require("mongodb").MongoClient;
var mongodb_1 = require("mongodb");
var amqplib = require("amqplib");
var app = express();
var appFolder = "UI/dist/ui";
var port = process.env.PORT;
var rabbit = process.env.RABBIT;
var client = new MongoClient("mongodb://localhost:27017");
app.use(express.json());
app.use(express.static(appFolder));
app.get("/api/orders", function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var database, orders, allOrders, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    database = client.db("manager");
                    orders = database.collection("orders");
                    return [4 /*yield*/, orders.find().sort({ status: 1 }).toArray()];
                case 1:
                    allOrders = _a.sent();
                    res.status(200).json(allOrders);
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    res.status(418).json();
                    console.log(error_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
});
app.get("/api/chat", function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var database, chats, allChats, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    database = client.db("manager");
                    chats = database.collection("chats");
                    return [4 /*yield*/, chats
                            .find()
                            .project({ messages: 0, _id: 0 })
                            .toArray()];
                case 1:
                    allChats = _a.sent();
                    res.status(200).json(allChats);
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _a.sent();
                    res.status(418).json();
                    console.log(error_2);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
});
app.get("/api/chat/:id", function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var id, database, chats, chat, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = req.params.id;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    database = client.db("manager");
                    chats = database.collection("chats");
                    return [4 /*yield*/, chats.findOne({ id: id }, { projection: { messages: 1, _id: 0 } })];
                case 2:
                    chat = _a.sent();
                    res.status(200).json(chat.messages);
                    return [3 /*break*/, 4];
                case 3:
                    error_3 = _a.sent();
                    res.status(418).json();
                    console.log(error_3);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
});
app.post("/api/change-status", function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, id, status, database, orders, result, order, statuses, message, error_4;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = req.body, id = _a.id, status = _a.status;
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    database = client.db("manager");
                    orders = database.collection("orders");
                    return [4 /*yield*/, orders.findOneAndUpdate({ _id: new mongodb_1.ObjectId(id) }, { $set: { status: status } })];
                case 2:
                    result = _b.sent();
                    order = result.value;
                    statuses = [
                        "принято",
                        "готовится",
                        "в доставке",
                        "доставлено",
                        "отменено",
                    ];
                    message = {
                        user: order.user.id,
                        text: "\u0421\u0442\u0430\u0442\u0443\u0441 \u0432\u0430\u0448\u0435\u0433\u043E \u0437\u0430\u043A\u0430\u0437\u0430 ".concat(id, " \u0431\u044B\u043B \u0438\u0437\u043C\u0435\u043D\u0435\u043D \u043D\u0430 \"").concat(statuses[status], "\"")
                    };
                    sendMessage(message);
                    res.status(200).json();
                    return [3 /*break*/, 4];
                case 3:
                    error_4 = _b.sent();
                    res.status(418).json();
                    console.log(error_4);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
});
app.post("/api/send-message", function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var data, message;
        return __generator(this, function (_a) {
            data = req.body;
            message = {
                user: data.id,
                text: data.text
            };
            sendMessage(message);
            res.status(200).json(data);
            return [2 /*return*/];
        });
    });
});
app.all("*", function (req, res) {
    res.status(200).sendFile("/", { root: appFolder });
});
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var orders, chat, conn, channel1, channel2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                orders = "orders";
                chat = "chat";
                return [4 /*yield*/, amqplib.connect(rabbit)];
            case 1:
                conn = _a.sent();
                return [4 /*yield*/, conn.createChannel()];
            case 2:
                channel1 = _a.sent();
                return [4 /*yield*/, channel1.assertQueue(orders)];
            case 3:
                _a.sent();
                channel1.consume(orders, function (msg) {
                    if (msg !== null) {
                        var order = __assign({ status: 0 }, JSON.parse(msg.content.toString()));
                        saveOrder(order);
                        channel1.ack(msg);
                    }
                    else {
                        console.log("Consumer cancelled by server");
                    }
                });
                return [4 /*yield*/, conn.createChannel()];
            case 4:
                channel2 = _a.sent();
                return [4 /*yield*/, channel2.assertQueue(chat)];
            case 5:
                _a.sent();
                channel2.consume(chat, function (msg) { return __awaiter(void 0, void 0, void 0, function () {
                    var message, database, chats;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!(msg !== null)) return [3 /*break*/, 2];
                                message = __assign({}, JSON.parse(msg.content.toString()));
                                database = client.db("manager");
                                chats = database.collection("chats");
                                return [4 /*yield*/, chats.updateOne({ id: message.user }, {
                                        $push: { messages: { from: false, text: message.text } }
                                    }, { upsert: true })];
                            case 1:
                                _a.sent();
                                channel2.ack(msg);
                                return [3 /*break*/, 3];
                            case 2:
                                console.log("Consumer cancelled by server");
                                _a.label = 3;
                            case 3: return [2 /*return*/];
                        }
                    });
                }); });
                return [2 /*return*/];
        }
    });
}); })();
function saveOrder(order) {
    return __awaiter(this, void 0, void 0, function () {
        var database, orders, chats;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    database = client.db("manager");
                    orders = database.collection("orders");
                    chats = database.collection("chats");
                    return [4 /*yield*/, orders.insertOne(order)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, chats.updateOne({ id: order.user.id }, {
                            $setOnInsert: { user: order.user.name, messages: [] }
                        }, { upsert: true })];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function sendMessage(message) {
    return __awaiter(this, void 0, void 0, function () {
        var queue, conn, channel, database, chats;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    queue = "chat";
                    return [4 /*yield*/, amqplib.connect(rabbit)];
                case 1:
                    conn = _a.sent();
                    return [4 /*yield*/, conn.createChannel()];
                case 2:
                    channel = _a.sent();
                    channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
                    database = client.db("manager");
                    chats = database.collection("chats");
                    return [4 /*yield*/, chats.updateOne({ id: message.user }, {
                            $push: {
                                messages: { from: true, text: message.text }
                            }
                        }, { upsert: true })];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
app.listen(port, function () {
    console.log("Example app listening on port ".concat(port));
});
