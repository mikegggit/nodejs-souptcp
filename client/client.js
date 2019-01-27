var net = require('net');
var util = require('util');
var os = require('os');

var START_SEQNO                            = 1;
var UNAME                                  = "brace1";
var PASSWORD                               = "password10";
var SESSIONID                              = "";
var SEQNO                                  = "1";
var TIMEOUT_HEARTBEAT_IN_SECONDS           = 1;
var TIMEOUT_NO_SERVER_HEARTBEAT_IN_SECONDS = 15;
var LOGIN_PACKET                           = "L" + UNAME + PASSWORD + SESSIONID.padStart(10, " ") + SEQNO.padStart(10, " ") + os.EOL;

var serverMonitor;
var parseArgs                              = require('minimist')

result = parseArgs(process.argv.slice(2) , 
  {"opts.boolean": true})
process.on('exit', function(code) {
  switch(code) {
    case 0:
      break;
    case 1:
      console.log('Missing required argument: ', 'sessionid');
      break;
    default:
      console.log('Exiting with code:', code);
  }
});

var isDebug = result['debug'];
var sessionid = result['sessionid'];

/**
 * SoupClient constructor.
 * @constructor
 *
 * @param config
 */
function SoupClient(config) {
  _this = this;
  this.sessionid = config['sessionid'];
  this.port = config['port'];
  this.socket;
  this.heartbeat;
  this.serverMonitor;
  
  /**
   * Timer invoked periodically to send client heartbeat to the server to maintain the connection, letting the server know we're still here.
   */
  this.scheduleClientHeartbeat = function() {
    this.heartbeat = setInterval(function() {
      _this.socket.write('R\n');
    }, TIMEOUT_HEARTBEAT_IN_SECONDS * 1000);
  }; 
 
  /**
   * Timer that waits for a server heartbeat within some interval.  If nothing is heard, client assumes the connection has been severed and explicitly severs it from the client side.
   */
  this.scheduleServerHeartbeatMonitor = function() {
    this.serverMonitor = setTimeout(function() {
      _this.socket.end("No server detected...Terminating connection.");
    } , TIMEOUT_NO_SERVER_HEARTBEAT_IN_SECONDS * 1000);
  };
 
  /**
   * Invoked to connect to the server socket.
   *
   * Establishes a socket, along with callbacks on the socket to handle connection issues and data received from the server.
   */
  this.connect = function() {
    this.socket = net.connect({port: this.port},
      function() { //'connect' listener
	console.log('client connected');
	_this.socket.write(LOGIN_PACKET);
      }
    );
    this.socket.on('error', function(e) {
      util.log("Error");
      socket.end()
    });
    this.socket.on('data', function(data) {
      var msgType = data.toString("utf-8", 0, 1);
      util.log("data" + msgType)

      switch(msgType) {
      case 'A':
	util.log("heard login accepted message.");
	_this.scheduleClientHeartbeat();
	_this.scheduleServerHeartbeatMonitor();
	break;
      case 'J':
	util.log("heard login rejected message.");
	break;
      case 'H':
	clearTimeout(_this.serverMonitor);
	_this.scheduleServerHeartbeatMonitor();
	break;
      case 'S':
        util.log("heard sequenced message." + data.toString("utf-8"));
	clearTimeout(_this.serverMonitor);
	_this.scheduleServerHeartbeatMonitor();
        break; 
      }
    });
  }
}

module.exports = {
  SoupClient: SoupClient
}
