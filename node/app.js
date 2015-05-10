var five = require('johnny-five');
var http = require('http').createServer(server);
var io = require('socket.io')(http);
var arduino = new five.Board();

function server(req, res){
	res.writeHead(200);
	res.end('Olá');
}

arduino.on('ready', function(){
	console.log("Arduino Pronto");
	var potenc1 = new five.Sensor("A0").scale(0, 100);
	var potenc2 = new five.Sensor("A1").scale(0, 100);

	potenc1.on('change', function(){
		io.emit('potenc1', this.value.toFixed());
	});
	potenc2.on('change', function(){
		io.emit('potenc2', this.value.toFixed());
	});
});

http.listen(4000);

io.on('connection', function(socket){
	console.log("Conectado");
});