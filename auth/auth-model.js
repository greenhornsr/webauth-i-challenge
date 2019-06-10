const db = require('../data/dbConfig')

module.exports = {
    register,
    logIn
}

function register(creds) {
    return db('users')
    .insert(creds)
    .then(([id]) => {
        db('users')
        .where({id})
    }) 
}

function logIn(cred) {
    return db('users')
    .where(cred)
    .first()
}
