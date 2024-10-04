#!/usr/bin/env node

var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function(error0, connection) {
  if (error0) {
    throw error0;
  }
  connection.createChannel(function(error1, channel) {
    if (error1) {
      throw error1;
    }

    var exchange = 'logs';

    // Declare the same 'fanout' exchange
    channel.assertExchange(exchange, 'fanout', {
      durable: false // No need to persist this exchange
    });

    // Create a temporary queue with a random name
    channel.assertQueue('', {
      exclusive: true // The queue will be deleted when the consumer disconnects
    }, function(error2, q) {
      if (error2) {
        throw error2;
      }
      console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q.queue);

      // Bind the queue to the exchange
      channel.bindQueue(q.queue, exchange, '');

      // Consume messages from the queue
      channel.consume(q.queue, function(msg) {
        if (msg.content) {
          console.log(" [x] %s", msg.content.toString());
        }
      }, {
        noAck: true // Messages are not acknowledged
      });
    });
  });
});
