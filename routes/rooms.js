const router = require('express').Router();
let Rooms = require('../models/room.model');


router.route('/').get((req, res) => {
    Rooms.find()
        .then(rooms => res.json(rooms))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/add').post((req, res) => {
    const roomname = req.body.roomname;
    const gamemaster = req.body.gamemaster;

    const newRoom = new Rooms({ roomname, gamemaster });

    console.log(req.body);

    newRoom.markModified();

    newRoom.save()
        .then(() => res.json(newRoom))
        .catch(err => res.status(400).json('Error: ' + err));

})


module.exports = router;
