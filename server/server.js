const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const {generateMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', function(socket){
  console.log('User connected');

  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

  //Broadcast message
  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));


  socket.on('createMessage', function(message, callback){
    console.log('createMessage', message);

    io.emit('newMessage', generateMessage(message.from, message.text));
    callback('This is from server');
  });

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

});

server.listen(port, function(){
  console.log('Server is up on port 3000')
});
