import express from 'express';
import path from 'path';
import cors from 'cors';
import socket from 'socket.io';
import mongoose from'mongoose';
import E from './common/events';

require('dotenv').config();

const app = express();
const port = process.env.SOCKET_PORT || 8080;

app
    .use('/', express.static(path.resolve(__dirname, 'build')))
    .use(cors())
    .use(express.json());

const mognoURI = process.env.ATLAS_URI;
mongoose.connect(mognoURI, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
const connection = mongoose.connection;
const roomsRouter = require('./routes/rooms');
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
});


app.use('/rooms', roomsRouter)

const server = app.listen(port, () => {
    console.log(`Server up and running on port ${port}`);
})

const io = socket(server);

io.on('connection', (sock) => {
    console.log(`user connected: ${socket.id}`);

    sock.on(E.CREATE_ROOM_FROM_CLIENT, ({ room }) => {
        sock.broadcast.emit(E.CREATE_ROOM_FROM_SERVER, { room })
    })
})