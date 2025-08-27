const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware.js');
const Post = require('../models/Poost.js');
const multer = require('multer');
const upload = multer({dest: 'upload/'})
const jwt = require('jsonwebtoken');

router.post('/create', authMiddleware,  upload.single('file'), async (req, res) => {
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
        res.json(posts);
    } catch(err){
         res.status(500).json({ error: 'Failed to fetch posts' });
    }
});

router.delete('/delete' ,authMiddleware, async (req, res) => {
    try{
        const userId = req.user.id;
        const {id} = req.body;
        const post = await Post.findById(id);

        if(!post){
            return res.status(402).json({ error : 'No post found'});
        }

        if(userId !== post.author){
            return res.status(403).json({ error: 'You are not allowed to delete others post'});
        }
            await Post.findByIdAndDelete(id);
            res.json({ message: 'Post deleted successfully!'});  
    } catch(err){
        res.status(500).json({ error: 'Failed to delete post'});
    }
})
module.exports = router;