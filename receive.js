#!/usr/bin/env node

var amqp = require('amqplib/callback_api');

// Connect to RabbitMQ
amqp.connect('amqp://localhost', function(error0, connection) {
  if (error0) {
    throw error0;
  }

  // Create a channel
  connection.createChannel(function(error1, channel) {
    if (error1) {
      throw error1;
    }

    var queue = 'hello';

    // Assert a queue (make sure it exists)
    channel.assertQueue(queue, {
      durable: false
    });

    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);

    // Consume messages from the queue
    channel.consume(queue, function(msg) {
      console.log(" [x] Received '%s'", msg.content.toString());
    }, {
      noAck: true
    });
  });
});
