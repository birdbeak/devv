var express = require('express');

var app = express();

var port = process.env.PORT || 3000;
var server = app.listen(port);

app.use(express.static('public'));

console.log('hello');

var socket = require('socket.io');

var io = socket(server);

io.sockets.on('connection', newConnection);

function newConnection(socket){
	console.log('new connection: ' + socket.id);
	
	socket.on('mouse', mouseMsg);
	
	function mouseMsg(data){
		socket.broadcast.emit('mouse',data);
		//io.sockets.emit('mouse',data);
		console.log(data);
	}
}
