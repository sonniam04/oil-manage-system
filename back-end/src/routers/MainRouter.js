const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

router.get('/main/Manager', async(req, res) => {
    //check token from session
    const token = req.session.managerToken;
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized access. Please login.' });
    }
    //check JWT
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token' });
        }
        //return data in token to client
        return res.status(200).json({
            message: 'Profile data',
            user: decoded,  //(username, name, position)
        });
    });
});
router.get('/main/Cashier', async(req, res) => {
    //check token from session
    const token = req.session.cashierToken;
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized access. Please login.' });
    }
    //check JWT
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token' });
        }
        //return data in token to client
        return res.status(200).json({
            message: 'Profile data',
            user: decoded,  //(username, name, position)
        });
    });
});

module.exports = router;