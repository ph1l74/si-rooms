const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const playerSchema = new Schema({
    playername: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    }
})

const Player = mongoose.model('Player', playerSchema);

module.exports = Player;