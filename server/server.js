import path from 'path';
import http from 'http';
import express from 'express';
import { Server } from 'socket.io';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';


import {generateMessage, generateLocationMessage} from './utils/message.js';
import {isRealString} from './utils/validation.js';
import Users from './utils/users.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const users = new Users();

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected');

    socket.on('join', (params, callback) => {
        if(!isRealString(params.name) || !isRealString(params.room)) {
            return callback('Name and room name are required');
        } 
        const roomString = params.room.toUpperCase();
        
        if (users.isNameDuplicate(params.name, roomString)) {
            return callback('Username already taken');
        }
        
        socket.join(roomString);
        users.removeUser(socket.id);
        
        users.addUser(socket.id, params.name, roomString);
        io.to(roomString).emit('updateUserList', users.getUserList(roomString));

        socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
        socket.broadcast.to(roomString).emit('newMessage', generateMessage('Admin', `${params.name} has joined.`));

        callback();
    });
    
    socket.on('createMessage', (message, callback) => {
        const user = users.getUser(socket.id);
        if(user && isRealString(message.text)) {
            io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
        }
        
        callback();
    });

    socket.on('createLocationMessage', (coords) => {
        const user = users.getUser(socket.id);
        if (user) {
            io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
        } 
    });

    socket.on('disconnect', () => {
        const user = users.removeUser(socket.id);
        if (user) {
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left`));
        }
    });
});

server.listen(port, () => {
    console.log(`Started up at port ${port}`);
});

export {app};