const router = require('express').Router();
let Room = require('../models/player.model');


router.route('/').get((req, res) => {
    Room.find()
        .then(rooms => res.json(rooms))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/add').post((req, res) => {
    const roomname = req.body.roomname;
    const players = [];
    const gamemaster = req.body.gamemaster;
    
    const newRoom = new Room({ roomname, players, gamemaster });

    newRoom.save()
        .then(() => res.json('Room added.'))
        .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/update').post((req, res) => {
});

module.exports = router
