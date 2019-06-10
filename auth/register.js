const router = require('express').Router();
const db = require('./auth-model');
const bcrypt = require('bcryptjs');


router.post('/', (req, res) => {
    const newuser = req.body
    // hashin' password for entry into db
    const hash = bcrypt.hashSync(newuser.password, 10) // has the password 2 ^ 10 times
    // reassign hashed password to user.password
    newuser.password = hash;
    
    db.register(newuser)
    .then(added => {
        res.status(201).json({success: true, message: `${newuser.username} has successfully registered!`, added})
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