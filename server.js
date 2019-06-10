const express = require('express');
const helmet = require('helmet')
const userRoutes = require('./resources/users-routes');

const server = express();

server.use(helmet(), express.json())

// server.use('/api/register')
// server.use('/api/login')
server.use('/api/users', logger, userRoutes)

server.get('/', logger, (req, res) => {
    res.send(`Hola Amigos!`)
})

// Logger Middleware
function logger(req, res, next) {
    console.log(`${req.method} request on route ${req.url} at [${new Date().toISOString()}]`);
    next();
}

module.exports = server;