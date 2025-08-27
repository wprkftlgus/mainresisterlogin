const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// register
router.post('/register',async (req,res) => {
    try {
        const { email, password } = req.body;
        const preUser = await User.findOne( {email });
        if (preUser) return res.status(404).json({ error: 'Already Exists User Email' })

        const hashed = await bcrypt.hash(password, 10);

        const newUser = new User({ email, password: hashed });
        await newUser.save();

        res.json({ message: 'Succesfully Resistered!'});
    } catch (err) {
        res.status(500).json({ error: 'Failed To Resister'});
    };
})
//Login
router.post('/login' , async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ error: 'No User'})
           
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: 'Password Incorrect'});

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
        res.json( {token, message: 'Login Sucessfully!'} );
    }   catch (err) {
        console.error(err);
        res.status(500).json({ error : 'Login Failed'});
    }
})

module.exports = router;