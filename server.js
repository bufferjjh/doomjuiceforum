var PORT = process.env.PORT || 5000;
var express = require('express');
var app = express();

var http = require('http');
var server = http.Server(app);
app.use(express.static('client'));
server.listen(PORT, function() {
  console.log('server running');
});

const io = require('socket.io')(server)
const users = {}

var usersOnline = 0

io.on('connection', socket => {

  socket.on('new-user', name => {
    users[socket.id]= name
    socket.broadcast.emit('new-server-user', name)
    console.log(name + ' has connected')
    usersOnline = Object.keys(users).length;
    io.sockets.emit('updateUserCount', usersOnline)
  })

  socket.on('disconnect', () => {
    socket.broadcast.emit('user-disconnected', users[socket.id])
    if(users[socket.id] != undefined && users[socket.id] != null ) {
      console.log(users[socket.id] + ' has disconnected')
    }
    delete users[socket.id]
    usersOnline = Object.keys(users).length;
    io.sockets.emit('updateUserCount', usersOnline)
  })

  socket.on('number-request', () => {
    usersOnline = Object.keys(users).length;
    io.sockets.emit('updateUserCount', usersOnline)
  })

  socket.on('sent-message', msg => {
    socket.broadcast.emit('user-sent-message', [users[socket.id], msg])
  })



})
