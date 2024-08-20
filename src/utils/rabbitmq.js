const amqp = require('amqplib/callback_api');

const RABBITMQ_URL = 'amqp://localhost';

function connectToRabbitMQ(callback) {
    amqp.connect(RABBITMQ_URL, (err, connection) => {
        if (err) {
            throw err;
        }
        callback(connection);
    });
}

function createChannel(connection, callback) {
    connection.createChannel((err, channel) => {
        if (err) {
            throw err;
        }
        callback(channel);
    });
}

function sendMessage(queue, message) {
    connectToRabbitMQ((connection) => {
        createChannel(connection, (channel) => {
            channel.assertQueue(queue, {
                durable: false
            });
            channel.sendToQueue(queue, Buffer.from(message));
            console.log(`[x] Sent ${message}`);
        });

        setTimeout(() => {
            connection.close();
        }, 500);
    });
}

function receiveMessages(queue, onMessageCallback) {
    connectToRabbitMQ((connection) => {
        createChannel(connection, (channel) => {
            channel.assertQueue(queue, {
                durable: false
            });
            console.log(`[x] Waiting for messages in ${queue}. To exit press CTRL+C`);
            channel.consume(queue, (msg) => {
                if (msg !== null) {
                    onMessageCallback(msg.content.toString());
                    channel.ack(msg);
                }
            });
        });
    });
}

module.exports = {
    sendMessage,
    receiveMessages
};
