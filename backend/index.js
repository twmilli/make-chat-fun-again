var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

var port = process.env.PORT || 3001;

var currentQuestion = "";

const middleware = function (_, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*')
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', ['GET', 'PUT', 'POST', 'DELETE'])
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization')
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true)
    // Pass to next layer of middleware
    next()
  }

app.use(middleware);

var EASY_QUESTIONS = [
    "What is something you love that most people hate?",
    "What is something you're terrible at but wish you could do well?"
]

var MEDIUM_QUESTIONS = [
    "What was the best year of your life? The worst? Why?"
]

var HARD_QUESTIONS = [
    "What was the most recent thing that made you cry?"
]

var QUESTIONS = {
    "HARD": HARD_QUESTIONS,
    "MEDIUM": MEDIUM_QUESTIONS,
    "EASY": EASY_QUESTIONS
}

io.on('connection', function(socket){
    if (currentQuestion != "") {
        socket.send('new question', currentQuestion);   
    }
    socket.on('chat message', function(msg){
        var now = new Date(Date.now())
        var day = now.getDate();
        var month = now.getMonth() + 1;
        var hours = now.getHours();
        var minutes = now.getMinutes();
        formattedDate = month + "-" + day + " " + hours + ":" + minutes;
    
        msg.sentTime = formattedDate;

        io.emit('chat message', msg);
    });
});

http.listen(port, function(){
    console.log('listening on *:' + port);
});

app.get('/question/:difficulty', function(req, res) {
    var difficulty = req.params.difficulty.toUpperCase();
    if (!difficulty in QUESTIONS) {
        throw new Error("Difficulty (" + difficulty + ") does not exist");
    }
    var question_list = QUESTIONS[difficulty];
    currentQuestion = question_list[Math.floor(Math.random() * question_list.length)];
    io.emit('new question', currentQuestion);
    res.sendStatus(200);
})