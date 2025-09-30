const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();
const Comment = require('../models/comment');

router.post('/create', authMiddleware, async (req,res) => {
    try {
        const {title, content} = req.body;
        const newComment = new Comment({title, content})
        await newComment.save();
        res.json({message : 'Susees!'})
    } catch(err){
        res.status(500).json({ error : 'Failed to upload comment!'})
    }
});
module.exports = router;