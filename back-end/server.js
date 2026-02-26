//load env
require('dotenv').config();

//dependencies
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const jwt = require('jsonwebtoken');
const http = require('http');
const { Server } = require("socket.io");

//set up
const app = express();
const server = http.createServer(app);

//socket
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
        credentials: true
    }
});
//socket connect
io.on('connection', (socket) => {
    socket.on('request', (data) => {
        socket.broadcast.emit('request-Fuel', { id: data.id, socketId: data.socketId });
    });
    socket.on('cancel-request', () => {
        socket.broadcast.emit('cancel-Fuel');
    })
    socket.on('cancel-res', () => {
        socket.broadcast.emit('cancel-now');
    })
    socket.on('goto-interface-confirm', (data) => {
        socket.broadcast.emit('goto-interface',{ id: data.id})
    })
    socket.on('changePage',(data) => {
        console.log(data.current)
        socket.emit('page-res', { current: data.current });

    })
    // disconnect
    socket.on('disconnect', () => {
        console.log('❌ client disconnected', socket.id);
    });
});

//env
const PORT = process.env.PORT || 5000;
const mongoUrl = process.env.mongoUrl;

//middleware
const {corsMiddleware,sessionMiddleware} = require('./middleware');
app.use(express.json());
app.use(corsMiddleware);
app.use(sessionMiddleware);

//router
const MainRouter = require('./src/routers/MainRouter');
const LoginRouter = require('./src/routers/LoginRouter');
const GetFinanceRouter = require('./src/routers/GetFinanceRouter')
const PriceRouter = require('./src/routers/PriceRouter')
const PriceFuelRouter = require('./src/routers/PriceFuelRouter')
app.use(MainRouter);
app.use(LoginRouter);
app.use(GetFinanceRouter);
app.use(PriceRouter)
app.use(PriceFuelRouter)

//connect DB
mongoose.connect(mongoUrl)
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.error('Error connecting to MongoDB:', error));

//run server
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});