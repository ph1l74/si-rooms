import express from 'express';
import path from 'path';
import cors from 'cors';
import socket from 'socket.io';

import E from './events';


const port = process.env.SOCKET_PORT || 5000;
const app = express();

app
    .use('/', express.static(path.resolve(__dirname, 'public')))
    .use(cors());

const server = app.listen(port, () => {
    console.log(`Server up and running on port ${port}`);
})

const io = socket(server);

io.on('connection', (sock) => {
    console.log(`user connected: ${socket.id}`);
    
    sock.on(E.CREATE_ROOM_FROM_CLIENT, ({room}) => {
        sock.broadcast.emit(E.CREATE_ROOM_FROM_SERVER, {room})
    })
})