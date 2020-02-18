const express = require('express');
const socket = require('socket.io');

// App setup
const app = express();
const PORT = 3000;

const server = app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
});

// Static files

app.use(express.static('public'))

// Socket setup

const io = socket(server);

io.on('connection', (socket) => {
  console.log('made socket connection', socket.id);

  socket.on('chat', (data) => {
    io.sockets.emit('chat', data);
  })

  socket.on('typing', (data) => {
    socket.broadcast.emit('typing', data)
  })

  socket.on('stoppedTyping', () => {
    socket.broadcast.emit('stoppedTyping')
  })
});
