var SoupClient = require('../client.js').SoupClient;

var config = {
  port: 9000
};

var client = new SoupClient(config);
client.connect();

