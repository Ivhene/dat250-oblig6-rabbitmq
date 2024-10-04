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
    var msg = 'Hello World!';

    // Assert a queue (make sure it exists)
    channel.assertQueue(queue, {
      durable: false
    });

    // Send message to the queue
    channel.sendToQueue(queue, Buffer.from(msg));
    console.log(" [x] Sent '%s'", msg);
  });

  // Close the connection after a short delay
  setTimeout(function() {
    connection.close();
    process.exit(0);
  }, 500);
});
