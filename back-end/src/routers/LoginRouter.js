const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const UserModel = require('../models/UserModel');

router.post('/login',async (req,res) => {
    //receipt data from client
    const {username,password} = req.body;
    //check data
    if(!username || !password){
        return res.status(400).json({ message: 'Username and password are required' });
    }

    try {
        //check username
        const user = await UserModel.findOne({ username: username });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        //match password
        const isPasswordCorrect = password == user.password;
        //create token
        if (isPasswordCorrect) {
            const payload = {
                username: user.username,
                name: user.name,
                position: user.position,
            };
            const token = jwt.sign(payload,process.env.JWT_SECRET, { expiresIn: '1h' });
            if (user.position === 'Manager') {
                req.session.managerToken = token;
            } else {
                req.session.cashierToken = token;
            }
            req.session.token = token;
            return res.status(200).json({ message: 'Login successful',token: token,payload: payload.position });
        } else {
            return res.status(401).json({ message: 'Invalid password' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
})

module.exports = router;