const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId, ref: 'Player',
        required: true
    },
    value: {
        type: Number,
        required: true
    },
    session: {
        type: Schema.Types.ObjectId, ref: 'Schema',
        required: true
    }
})

const User = mongoose.model('User', userSchema);

module.exports = User;