const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware.js');
const Post = require('../models/Poost.js');
const multer = require('multer');
const upload = multer({dest: 'upload/'})
const jwt = require('jsonwebtoken');
const User = require('../models/User');

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

router.get('/postDetail/:id', async (req,res) => {
    try {
        const post = await Post.findById(req.params.id).populate('author');
        if(!post){ return res.status(404).json({ message: "Post not found" });}
        res.json(post);
    } catch(err){
        res.status(500).json({ error: 'Failed to show the detail of post'});
    }
});

router.get('/', async (req, res) => {
    try {
        const posts = await Post.find().populate('author', 'username email').sort({ createdAt: -1});
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
        

         if(!{id}){
            return res.status(404).json({ error : 'You are not allowed'});
        }
        if(!post){
            return res.status(404).json({ error : 'No post found'});
        }
        if(!userId){
            return res.status(401).json({ error: 'You are not allowed'});
        }
        if(userId !== post.author.toString()){
            return res.status(403).json({ error: 'You are not allowed to delete others post'});
        }
            await Post.findByIdAndDelete(id);
            res.json({ message: 'Post deleted successfully!'});  
    } catch(err){
        res.status(500).json({ error: 'Failed to delete post'});
    }
})

router.delete('/deleteAllPost' , authMiddleware, async (req, res) => {
    try{
        const user = await User.findOne(req.body)
        if(user){
            Post.deleteMany();
        }
        res.json({message : 'delete all!'});
    } catch(err){
        res.status(500).json({ error: 'failed to delete!'})
    }
})
module.exports = router;