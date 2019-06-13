const router = require('express').Router();

router.delete('/', (req, res) => {
    req.session ? req.session.destroy(err => {
    err ? res.send('error logging out'): 
    res.send('thanks for visiting!');
    }):
    res.status(404).json({message: 'Not currently logged in.'})
})

module.exports = router;