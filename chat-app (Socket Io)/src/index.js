const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const path = require('path');
const Filter = require('bad-words');
require('dotenv').config();

const port = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);

const io = socketio(server);

app.use(express.static(path.join(__dirname, '../public')));

let count = 0;

io.on('connection', (socket) => {
    console.log('New WebSocket connection');

    // --------------------------------------------------

    // Lesson 1: Sending and receiving events

    // socket.emit('countUpdated', count);

    // socket.on('increment', () => {
    //     count++;
    //     io.emit('countUpdated', count); // emits to all connections
    // });

    // --------------------------------------------------

    // Lesson 2: Chat application

    const filter = new Filter();

    socket.emit('message', 'Welcome dear user!');
    // to send message to all users except the current user
    socket.broadcast.emit('message', 'A new user has joined!');

    socket.on('sendMessage', (message, callback) => {

        if (filter.isProfane(message)) {
            return callback('Profanity is not allowed!');
        }

        io.emit('message', message);
        callback('Delivered!'); // Acknowledgement
    });

    socket.on('sendLocation', (coords) => {
        io.emit('message', `https://google.com/maps?q=${coords.latitude},${coords.longitude}`);
    }, (error) => {
        console.log(error);
    });

    // disconnect event
    socket.on('disconnect', () => {
        io.emit('message', 'A user has left!');
    });
});


server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

