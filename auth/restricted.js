function restricted(req, res, next) {
    req.session && req.session.username ? next():
    res.status(401).json({success: false, message: 'Must be logged in with valid username and password!'});
}

module.exports = restricted;