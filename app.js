// Express Initiallization
var express = require('express')
var app = express();
var serv = require('http').Server(app);

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/client/index.html');
    // res.send("<style>h1{text-align: center;}</style><h1> Hello World </h1>");
    console.log("============================");
    console.log("Server started at port 2000!");
});
app.use('/client', express.static(__dirname + '/client'));
serv.listen(2000);

// Socket.io Initiallization
var io = require('socket.io')(serv, {});
var SOCKET_LIST = {};
io.sockets.on('connection', function(socket) {
    // On connection send a signal to the client an load the login page.
    socket.emit('enter-username', /** */ );

    // Pass the username to the socket list.
    socket.on('usernameEntered', function(data) {
        socket.name = data;
        SOCKET_LIST[socket.name] = socket;
        SOCKET_LIST[socket.name].emit('login-completed', socket.name);
    });

    socket.on('message-entered', function(data) {
        socket.message = data;
        for (var i in SOCKET_LIST) {
            SOCKET_LIST[i].emit('add-ToChat', "<div id='username-bold'>" + socket.name + " : </div>" + socket.message);
        }
    });

    console.log("a user has connected");
});





// And display the chatbox div.
// When the user enter in the input message box
// => Take the input message, and pass a signal and message to server and process
// => The server should process the data from the input message and send a div to the chat-messages, using inner HTML function
// => 
// => 
// => 
// => 
// => 
// =>