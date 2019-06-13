const router = require('express').Router();
const dbUsers = require('./users-model');
const restricted = require('../auth/restricted');



router.get('/', restricted, (req, res) => {
    dbUsers.find()
    .then(users => {
        users.length >= 1 ? res.status(200).json({success: true, users, session: req.session}):
        res.status(404).json({success: false, message: 'Sorry, currently, no users in database!'})
    })
    .catch(err => {
        res.status(500).json(errorRef(err))
    })
})

// Error Middleware
const errorRef = (error) => {
    const hash = Math.random().toString(36).substring(2);
    console.log(hash, error)
    return { message: `\n\nUnknown Error, Ref: ${hash}\n\n`, error }
}


module.exports = router;