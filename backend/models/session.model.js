const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const sessionSchema = new Schema({
    _id: String,
    players: [{
        type: Schema.Types.ObjectId, ref:'Player'
    }],
    scores: [{
        type: Schema.Types.ObjectId, ref:'Score'
    }],
    gamemasterId: {
        type: Schema.Types.ObjectId, ref:'Player',
        required: true
    },
    room: {
        type: Schema.Types.ObjectId, ref:'Room'
    },
    timestamps: true
})

const Session = mongoose.model('Session', sessionSchema);

module.exports = Session;