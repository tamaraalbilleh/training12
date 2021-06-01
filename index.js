'use strict';
require('dotenv').config();
const express = require ('express');
const app = express ();
const http = require ('http');
const server = http.createServer(app);
const PORT =process.env.PORT || 5000;
app.use (express.static('./public'))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const {Server} = require ('socket.io');
const io = new Server (server)

app.get ('/' , homePageHandler);
function homePageHandler (req, res){
    res.sendFile(__dirname + './public/index.html');
}



io.on('connection', (socket) => {
    console.log ('a user has entered the chat 🥳')
    socket.on ('disconnect' , ()=>{
        console.log ('user has left the chat 🥺')
    })
    socket.on ('chat message' , (message)=>{
        console.log (`message : ${message}` );
        io.emit ('chat message' , message)
    })
});


function start (port){
    server.listen (port , ()=>{
        console.log (`listening on PORT :${port}`)
    })
}

start (PORT)















