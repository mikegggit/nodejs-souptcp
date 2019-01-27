var SoupClient = require('../client.js').SoupClient;

var config = {
  port: 9000
};

// We don't pass a sessionid, so we'll connect to whatever the active session is on the server.
var client = new SoupClient(config);
client.connect();

