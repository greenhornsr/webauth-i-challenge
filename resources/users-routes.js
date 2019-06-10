const router = require('express').Router();
const dbUsers = require('./users-model');


router.get('/', (req, res) => {
    dbUsers.find()
    .then()
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