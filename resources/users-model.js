const db = require('../data/dbConfig');

module.exports = {
    find,
    findBy,
    remove
}

function find() {
    return db('users')
}

function findBy(username){
    return db('users')
    .where(username)
    .first()
}

function remove() {
    return null
}
