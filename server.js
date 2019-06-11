const express = require('express');
const helmet = require('helmet')

const restricted = require('./auth/restricted');
const userRoutes = require('./resources/users-routes');
const register = require('./auth/register');
const login = require('./auth/login');
const logout = require('./auth/logout-session');

const session = require('express-session');
const KnexSessionStore = require('connect-session-knex')(session);


const server = express();

const sessionConfig = {
    name: 'banana',  // by default the name is sid.  changing the name is done to prevent attackers from knowing which library is being used.
    secret: 'keep it secret, keep it safe!',
    resave: false, // if there are no changes to session, don't resave the session
    saveUninitialized: true, // for GDPR compliance, in production...should be false unless client agrees to cookies
    cookie: {
      maxAge: 1000 * 600, //session length in milliseconds...1000 * 600 = 10 minutes
      secure: false, // send cookie only over https, set to true in production
      httpOnly: true, // always set to true, it means client JS can't access the cookie
    },
    store: new KnexSessionStore({
        knex: require('./data/dbConfig'),
        tablename: 'sessions',
        sidfieldname: 'sid',
        createtable: true, 
        // clears sessions after set time.  currently equivelant to 1/2 hour.  1000 milliseconds, * 60 = 1 minute, * 30 = 30 minutes.
        clearInterval: 1000 * 60 * 30  
        })
}

server.use(helmet(), express.json())
server.use(session(sessionConfig))

server.use('/api/auth/register', register)
server.use('/api/auth/login', login)
server.use('/api/users', logger, restricted, userRoutes)
server.use('/api', logger, logout)


server.get('/', logger, (req, res) => {
    res.send(`Hola Amigos!`)
})

// Logger Middleware
function logger(req, res, next) {
    console.log(`${req.method} request on route ${req.originalUrl} at [${new Date().toISOString()}]`);
    next();
}

module.exports = server;