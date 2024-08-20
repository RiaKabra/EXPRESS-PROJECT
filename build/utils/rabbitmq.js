"use strict";

var amqp = require('amqplib/callback_api');
var RABBITMQ_URL = 'amqp://localhost';
function connectToRabbitMQ(callback) {
  amqp.connect(RABBITMQ_URL, function (err, connection) {
    if (err) {
      throw err;
    }
    callback(connection);
  });
}
function createChannel(connection, callback) {
  connection.createChannel(function (err, channel) {
    if (err) {
      throw err;
    }
    callback(channel);
  });
}
function sendMessage(queue, message) {
  connectToRabbitMQ(function (connection) {
    createChannel(connection, function (channel) {
      channel.assertQueue(queue, {
        durable: false
      });
      channel.sendToQueue(queue, Buffer.from(message));
      console.log("[x] Sent ".concat(message));
    });
    setTimeout(function () {
      connection.close();
    }, 500);
  });
}
function receiveMessages(queue, onMessageCallback) {
  connectToRabbitMQ(function (connection) {
    createChannel(connection, function (channel) {
      channel.assertQueue(queue, {
        durable: false
      });
      console.log("[x] Waiting for messages in ".concat(queue, ". To exit press CTRL+C"));
      channel.consume(queue, function (msg) {
        if (msg !== null) {
          onMessageCallback(msg.content.toString());
          channel.ack(msg);
        }
      });
    });
  });
}
module.exports = {
  sendMessage: sendMessage,
  receiveMessages: receiveMessages
};