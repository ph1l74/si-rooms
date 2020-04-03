const router = require('express').Router();
let Score = require('../models/score.model');


router.route('/').get((req, res) => {
    Score.find()
        .then(scores => res.json(scores))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/add').post((req, res) => {
    const user = req.body.user;
    const value = req.body.value;
    const session = req.body.session;

    const newScore = new Score({ user, value, session });

    newScore.save()
        .then(() => res.json('Score added.'))
        .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/update').post((req, res) => {
});

module.exports = router
