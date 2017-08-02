var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io').listen(server);

if(process.env.SERVER_PORT) { 
    var port = process.env.SERVER_PORT; 
}
else {
    var port = 80; 	
}

app.use(express.static('public'));

server.listen(port, function () {
  console.log('Nifty server running on port '+port+'!');
});

io.set('transports', ['websocket']);


io.on('connection', function (socket) {
	
	app.get('/cardmatch/:id', function (req, res) {
	  res.send(req.params.id);
	  if(!isNaN(req.params.id)){
			socket.broadcast.emit('card_image', {'auto':true,'src':'http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid='+req.params.id+'&type=card'});
	  }
	});

	socket.on('card_image', function(msg){
		socket.broadcast.emit('card_image', msg);
	  });
	

  
});
