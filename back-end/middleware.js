//load env
require('dotenv').config();

//cors
const cors = require('cors');
const corsMiddleware = cors({
    origin: 'http://localhost:5173',
    credentials: true,               
});

//session
const session = require('express-session');
const sessionMiddleware = session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 3600000 }
});
//exports
module.exports = {corsMiddleware,sessionMiddleware}