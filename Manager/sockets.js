"use strict";
exports.__esModule = true;
exports.addMessage = void 0;
var message_1 = require("./classes/message");
var addMessage = function (client, io) {
    client.on("add-message", function (payload) {
        payload.id = client.id;
        message_1.Message.addMessage(payload);
        io.to(client.id).emit("user-id", client.id);
        io.emit("users-online", message_1.Message.getUserList());
    });
};
exports.addMessage = addMessage;
