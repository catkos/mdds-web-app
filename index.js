'use strict';

const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.static('public'));

io.on('connection', (socket) => {

  let selectedRoom = '1';
  let username = '';

  socket.on('user connected', (givenUsername) => {

    //if empty username, name is anonymous with the last two characters of their ID
    if(givenUsername){
      username = givenUsername;
    } else {
      username = 'Anonyymi-'+socket.id.slice(-2);
    }

    // Join first room by default
    socket.join(selectedRoom);
    // Welcome message
    io.emit('welcome', username + ' liittyi chattiin!');

  });

  console.log('a user connected', socket.id);

  socket.on('disconnect', () => {
    // on disconnect, emit that username left
    io.emit('goodbye', username + ' poistui.');
    console.log('a user disconnected', socket.id);
  });

  // Get chat message, what room they're in, and who sent the message
  socket.on('chat message', (msg, room, sender) => {

    // Switch rooms, leave previous room
    socket.on('join room', room => {
      socket.leave(selectedRoom);
      
      socket.join(room);

      selectedRoom = room;
    });

    // Emit chat message to room
    io.to(room).emit('chat message', {msg, sender, username});
  });

});

http.listen(3000, () => {
  console.log('listening on port 3000');
});