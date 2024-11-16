// server.js

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { Server } from 'socket.io';
import http, { request } from 'http';

import Connection from './database/db.js';
import route from './routes/Routes.js';

import path from 'path';

const app = express();
const server = http.createServer(app); // Create HTTP server
const io = new Server(9000, {
    cors: {
        origin: 'http://localhost:3000'
    }
})
// Attach Socket.IO to the HTTP server

const PORT = 8000;

app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use('/', route);

// ---------------------------------------------Deployement--------------------------------------------------------
const __dirname1 = path.resolve();

if (process.env.NODE_ENV === 'production') {    
    app.use(express.static(path.join(__dirname1, "../client/build"))); // Adjust the path to client build directory

    app.get('*', (request, response) => {
        response.sendFile(path.resolve(__dirname1, "..", "client", "build", "index.html")); // Adjust the path to index.html
    })
} else {
    app.get("/", (request, response) => {
        response.send("API running successfully");
    });
}

// ---------------------------------------------Deployement--------------------------------------------------------
Connection();

let users = [];

const addUser = (userData, socketId) => {
    !users.some(user => user.sub === userData.sub) && users.push({ ...userData, socketId });
}

const getUser = (userId) => {
    return users.find(user => user.sub === userId);
}

io.on('connection', (socket) => {
    console.log("User Connected");

    // Connect
    socket.on("addUsers", userData => {
        addUser(userData, socket.id);
        io.emit("getUsers", users);
    });

    // Send message
    socket.on('sendMessage', (data) => {
        console.log('Received message data:', data);
        const user = getUser(data.receiverId);
        console.log('Found user:', user);
        if (user) {
            console.log('User socketId:', user.socketId);
            io.to(user.socketId).emit('getMessage', data);
        } else {
            console.log('User not found for id:', data.receiverId);
        }
    });
});

server.listen(PORT, () => console.log(`Server is running successfully on PORT ${PORT}`));