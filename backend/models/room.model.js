const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const roomSchema = new Schema({
    _id: String,
    roomname: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    players: [{ type: Schema.Types.ObjectId, ref: 'Player' }],
    gamemaster: {
        type: Schema.Types.ObjectId, ref: 'Player',
        required: true,
        trim: true
    }
}, {
    timestamps: { type: true }
}
)

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;