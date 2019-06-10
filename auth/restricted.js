const bcrypt = require('bcryptjs');
const User = require('../resources/users-model');


function restricted(req, res, next) {
    const {username, password} = req.body;
    username && password ? 
    User.findBy(username)
    .first()
    .then(user => {
        user && bcrypt.compareSync(password, user.password) ? next():
        res.status(401).json({status: false, message: 'Invalid Credentials!'})
    })
    .catch(err => {
        res.status(500).json(errorRef(err))
    }):
    res.status(400).json({success: false, message: 'Must provide a username and password'});
}

// Error Middleware
const errorRef = (error) => {
    const hash = Math.random().toString(36).substring(2);
    console.log(hash, error)
    return { message: `\n\nUnknown Error, Ref: ${hash}\n\n`, error }
}

module.exports = restricted;