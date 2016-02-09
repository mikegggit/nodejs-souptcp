var net = require('net');
var util = require('util');
var os = require('os');


var TIMEOUT_HEARTBEAT_IN_SECONDS = 1;
var TIMEOUT_NO_SERVER_HEARTBEAT_IN_SECONDS = 15;
var serverMonitor;

var parseArgs=require('minimist')

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
console.log(isDebug);
console.log(sessionid);

function SoupClient(config) {
  _this = this;
  this.sessionid = config['sessionid'];
  this.port = config['port'];
  this.socket;
  this.heartbeat;
  this.serverMonitor;
  this.scheduleClientHeartbeat = function() {
    this.heartbeat = setInterval(function() {
      _this.socket.write('R\n');
    }, TIMEOUT_HEARTBEAT_IN_SECONDS * 1000);
  }; 
  this.scheduleServerHeartbeatMonitor = function() {
    this.serverMonitor = setTimeout(function() {
      _this.socket.end("No server detected...Terminating connection.");
    } , TIMEOUT_NO_SERVER_HEARTBEAT_IN_SECONDS * 1000);
  };
  this.connect = function() {
    this.socket = net.connect({port: this.port},
      function() { //'connect' listener
	console.log('client connected');
	_this.socket.write('Lbrace1password10                              ' + os.EOL);
      }
    );
    this.socket.on('error', function(e) {
      util.log("Error");
    });
    this.socket.on('data', function(data) {
      util.log("heard data")
      var msgType = data.toString("utf-8", 0, 1);

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
	util.log("heard server heartbeat.");
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
