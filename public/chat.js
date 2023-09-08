'use strict';

// Server URL below must point to your server, localhost works for local development/testing
const socket = io('http://localhost:3000');

// Set new username
document.querySelector('#usernameForm').addEventListener('submit', (event) => {
  event.preventDefault();
  const inp = document.getElementById('name').value;
  socket.emit('register username', inp);
});

//  Send chat message
document.querySelector('#inputMsg').addEventListener('submit', (event) => {
  event.preventDefault();
  const inp = document.getElementById('m');
  socket.emit('chat message', inp.value);
  inp.value = '';
});

// Add chat message
socket.on('chat message', ({username, msg, userID}) => {
  const bubble = document.createElement('div');
  const name = document.createElement('div');
  const message = document.createElement('div');
  name.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" /></svg>' + username;
  name.className = 'text-if-black pb-2 flex items-centered';

  // TODO: if id same as the user currently looking at page, change msg color
  console.log('id of user who sent msg: ' + userID);

  message.className = 'bg-if-red rounded-full px-6 py-3 w-fit';
  message.innerHTML = msg;
  document.getElementById('messages').appendChild(bubble);
  bubble.appendChild(name);
  bubble.appendChild(message);
  bubble.className = 'message pb-5';

  // Scroll to the bottom of the section
  const messageSection = document.querySelector('#messageSection');
  messageSection.scrollTop = messageSection.scrollHeight;
});