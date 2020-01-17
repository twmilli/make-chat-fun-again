var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

var port = process.env.PORT || 3001;

io.on('connection', function(socket){
    socket.on('chat message', function(msg){
        var now = new Date(Date.now())
        var day = now.getDate();
        var month = now.getMonth() + 1;
        var hours = now.getHours();
        var minutes = now.getMinutes();
        formattedDate = month + "-" + day + " " + hours + ":" + minutes;
    
        msg.sentTime = formattedDate;

        io.emit('chat message', msg);
        console.log(msg)
    });
});

http.listen(port, function(){
    console.log('listening on *:' + port);
});