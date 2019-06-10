const db = require('../data/dbConfig')

module.exports = {
    register,
    login
}

function register(creds) {
    return db('users')
    .insert(creds)
    .then(([id]) => {
        db('users')
        .where({id})
    }) 
}

function login(creds) {
    return null
}
