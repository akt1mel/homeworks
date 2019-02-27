'use strict';

const chat = document.querySelector('.chat');
const chatStatus = document.querySelector('.chat-status');
const messageSubmit = document.querySelector('.message-submit');
const messageStatus = document.querySelector('.message-status');
const messagesContent = document.querySelector('.messages-content');
const messageLoading = document.querySelector('.loading');
const messageTemplates = document.querySelector('.messages-templates');
const messageBox = chat.querySelector('.message-box');
const messageInput = chat.querySelector('.message-input');

const connection = new WebSocket('wss://neto-api.herokuapp.com/chat');

connection.addEventListener('open', () => {
    chatStatus.textContent = chatStatus.dataset.online;
    messageSubmit.disabled = false;
    messageStatus.firstElementChild.textContent = 'Пользователь появился в сети';
    messagesContent.appendChild(messageStatus.cloneNode(true));
});


connection.addEventListener('message', (event) => {
 let message = event.data;
 let time = (new Date()).toTimeString().substr(0, 5);

 if (message === '...') {
    messagesContent.appendChild(messageLoading.cloneNode(true));
 } else {
     let newMessage = messageTemplates.querySelector('.message:not(.loading)');
     newMessage.querySelector('.message-text').textContent = message;
     newMessage.querySelector('.timestamp').textContent = time;
     messagesContent.appendChild(newMessage.cloneNode(true));
 }
});

messageBox.addEventListener('submit', (event) => {
   event.preventDefault();
   let message = messageInput.value;
   let time = (new Date()).toTimeString().substr(0, 5);
   if (!message) return;
    let newMessage = messageTemplates.querySelector('.message-personal');
    newMessage.querySelector('.message-text').textContent = message;
    newMessage.querySelector('.timestamp').textContent = time;
    messagesContent.appendChild(newMessage.cloneNode(true));
    connection.send(message);
});

connection.addEventListener('close',() => {
    chatStatus.textContent = chatStatus.dataset.offline;
    messageSubmit.disabled = true;
    messageStatus.firstElementChild.textContent = 'Пользователь не в сети';
    messagesContent.appendChild(messageStatus.cloneNode(true));
});