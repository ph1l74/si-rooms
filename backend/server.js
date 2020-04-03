const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });

const connection = mongoose.connection;

connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
});

const playersRouter = require('./routes/players');
const roomsRouter = require('./routes/rooms');
const sessionsRouter = require('./routes/sessions');
const scoresRouter = require('./routes/scores');

app.use('/players', playersRouter)
app.use('/rooms', roomsRouter)
app.use('/sessions', sessionsRouter)
app.use('/scores', scoresRouter)


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})
