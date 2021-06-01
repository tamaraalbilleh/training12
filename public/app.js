'use strict';
const socket = io();
const messages = document.getElementById ('messages')
const form = document.getElementById('form');
const input = document.getElementById ('input');

form.addEventListener ('submit', (e)=>{
    e.preventDefault ()
    if (input.value){
        socket.emit ('chat message' , input.value);
        input.value = '';
    }
})

socket.on ('chat message' , function (message){
    let liElement = document.createElement ('li');
    liElement.textContent = message;
    messages.appendChild (liElement);
    window.scrollTo(0 , document.body.scrollHeight);
})
