const express = require('express');
const server = express();

server.use(express.json())

server.get('/', logger, (req, res) => {
    res.send(`Hola Amigos!`)
})

// Logger Middleware
function logger(req, res, next) {
    console.log(`${req.method} request on route ${req.url} at [${new Date().toISOString()}]`);
    next();
}

module.exports = server;