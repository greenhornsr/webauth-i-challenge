const db = require('../data/dbConfig');

module.exports = {
    find,
    findBy,
    add,
    remove
}

function find() {
    return db('users')
}

function findBy(username){
    return db('users')
    .where(username)
}

function add() {
    return null
}

function remove() {
    return null
}
