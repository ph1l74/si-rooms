const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const roomsSchema = new Schema({
    roomname: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    gamemaster: {
        type: String,
        required: true,
        trim: true
    }
}, {
    timestamps: { type: true }
}
)

const Rooms = mongoose.model('rooms', roomsSchema);

module.exports = Rooms;