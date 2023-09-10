'use strict';

// TODO:
// Fix username: check if username already taken. don't have as a prompt. let it be empty for anonynmous name
// Ask for user to input their username
let setUsername = prompt('Anna käyttäjänimi:');
while(!setUsername){
  setUsername = prompt('Anna käyttäjänimi (ei voi olla tyhjä:)');
}

// Server URL below must point to your server, localhost works for local development/testing
const socket = io('http://localhost:3000');

// Render new username
socket.emit('user connected', setUsername);
const usernameText = document.getElementById('username');
usernameText.innerHTML = setUsername;

// display a welcome message when someone new joins
socket.on('welcome', (welcomeMessage) => {
  displayMessage(welcomeMessage);
});
// display a goodbye message when someone disconnects
socket.on('goodbye', (goodbyeMessage) => {
  displayMessage(goodbyeMessage);
});

// render a system message to chat message section
const displayMessage = (message) => {
  const bubble = document.createElement('div');
  const greetingText = document.createElement('span');

  greetingText.innerHTML = message;
  greetingText.classList = 'text-if-black';

  bubble.classList = 'text-center';
  bubble.appendChild(greetingText);
  document.getElementById('messages').appendChild(bubble);
};

// Change room
document.querySelector('#huone').addEventListener('change', () => {
  const room = document.getElementById('huone').value;
  console.log('huone', room);
  socket.emit('join room', room);
});

// Send chat message to server side
document.querySelector('#inputMsg').addEventListener('submit', (event) => {
  event.preventDefault();
  const inp = document.getElementById('m');
  const room = document.getElementById('huone').value;
  const sender = setUsername;
  socket.emit('chat message', inp.value, room, sender);
  inp.value = '';
});

// Get chat message, add it on page
socket.on('chat message', ({msg, sender}) => {
  const bubble = document.createElement('div');
  const name = document.createElement('div');
  const message = document.createElement('div');
  name.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" /></svg>' + sender;
  name.className = 'text-if-black pb-2 flex items-centered';

  message.className = 'bg-if-red rounded-full px-6 py-3 w-fit';
  message.innerHTML = msg;
  document.getElementById('messages').appendChild(bubble);
  bubble.appendChild(name);
  bubble.appendChild(message);

  // If sender same as the user, add classes
  if(sender === setUsername){
    bubble.className = 'message pb-5 flex flex-col items-end';
    message.className = 'bg-if-blue rounded-full px-6 py-3 w-fit';
  }else{
    bubble.className = 'message pb-5 flex flex-col items-start';
  };

  // Scroll to the bottom of the section
  const messageSection = document.querySelector('#messageSection');
  messageSection.scrollTop = messageSection.scrollHeight;
});