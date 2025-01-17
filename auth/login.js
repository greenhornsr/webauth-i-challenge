const router = require('express').Router();
const bcrypt = require('bcryptjs');
const db = require('./auth-model');


router.post('/', (req, res) => {
    const {username, password} = req.headers;
    db.logIn({username})  // without the {} around username, we would have to change the where statement for db.logIn to be where('username', cred).
    .then(user => {
        // console.log('password', password, 'user.password', user.password)
        if (user && bcrypt.compareSync(password, user.password)) {
            req.session.username = user.username
            res.status(200).json({ success: true, message: `Welcome ${user.username}!` })
        }else{
            res.status(401).json({ success: false, message: 'Invalid Credentials' });
        }
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