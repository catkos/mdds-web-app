'use strict';

const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.static('public'));

io.on('connection', (socket) => {

  console.log('a user connected', socket.id);

  socket.on('disconnect', () => {
    console.log('a user disconnected', socket.id);
  });

  // Assign username (if no username, name is anonymous with the last two characters of id)
  let username = 'Anonyymi-'+socket.id.slice(-2);
  socket.on('register username', newUsername => {
    username = newUsername;
  });

  socket.on('chat message', (msg) => {
    console.log('message: ', msg);
    // Get id of the user who sent the msg
    let userID = socket.id;
    // Add username to message
    io.emit('chat message', {username, msg, userID});
  });
});

http.listen(3000, () => {
  console.log('listening on port 3000');
});