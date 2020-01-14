var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

var port = process.env.PORT || 3001;

io.on('connection', function(socket){
    socket.on('chat message', function(msg){
        io.emit('chat message', msg);
        console.log(msg)
    });
});

http.listen(port, function(){
    console.log('listening on *:' + port);
});