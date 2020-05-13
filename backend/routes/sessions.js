const router = require('express').Router();
let Session = require('../models/session.model');


router.route('/').get((req, res) => {
    Session.find()
        .then(sessions => res.json(sessions))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/add').post((req, res) => {
    const players = req.body.players;
    const scores = req.body.scores;
    const gamemaster = req.body.gamemaster;
    const room = req.body.room;
    const isActive = true;

    const newSession = new Score({ players, scores, gamemaster, room, isActive });

    newSession.save()
        .then(() => res.json('Score added.'))
        .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/update').post((req, res) => {
});

module.exports = router
