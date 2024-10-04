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
    var msg = process.argv.slice(2).join(' ') || 'Hello World!';

    // Declare a 'fanout' exchange
    channel.assertExchange(exchange, 'fanout', {
      durable: false // No need to persist this exchange
    });

    // Publish message to the exchange
    channel.publish(exchange, '', Buffer.from(msg));
    console.log(" [x] Sent %s", msg);
  });

  // Close the connection after a short delay
  setTimeout(function() {
    connection.close();
    process.exit(0);
  }, 500);
});
