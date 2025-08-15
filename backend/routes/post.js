const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware.js');
const Post = require('./models/Post');
const multer = require('multer');

router.post('/create', authMiddleware, async (req, res) => {
    try{
        const { title, content } = req.body;
        const author = req.user.id;
        const newPost = new Post({ title, content, author});
        await newPost.save();

        res.json({ Message: 'Post created!'});
    } catch(err){
        res.status(500).json({ error: 'Failed to upload post'});
    }
});

router.get('/', async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1});
        res(posts);
    } catch(err){
         res.status(500).json({ error: 'Failed to fetch posts' });
    }
});

module.exports = router;