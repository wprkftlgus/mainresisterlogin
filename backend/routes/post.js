const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware.js');
const uploadMiddleware = require('../middleware/multerMiddleware');
const Post = require('../models/Poost.js');
const jwt = require('jsonwebtoken');
const User = require('../models/User');


router.post('/create', authMiddleware, uploadMiddleware, async (req, res) => {
        try{
        const { title, content, price } = req.body;
        const author = req.user.id;

        let imageBase64 = null;
        let imageType = null;

        if(req.file){
            imageBase64 = req.file.buffer.toString("base64");
            imageType = req.file.mimetype;
        }
        const newPost = new Post({ title, content, author, price, 
            image: imageBase64, imageType: req.file?.mimetype
        });
        await newPost.save();
        res.json({ Message: 'Post created!'});
    } catch(err){
        res.status(500).json({ error: 'Failed to upload post'});
    }
    });

router.use((err, req, res, next) => {
    console.error(err);
    res.status(400).json({ error: err.message});
})

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

router.get('/search/:value', async (req,res) => {
    try {
        const value = req.params.value;
        const postSearched = await Post.find({
            title : {$regex: value, $options: 'i'}
        });
        res.json(postSearched);
    } catch(err){
        res.status(500).json({ error: "Failed to search"});
    }
})

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



router.put('/update/:id', authMiddleware, uploadMiddleware, async (req, res) => {
    try{
        const { id } = req.params;
        const userId = req.user.id;
        const post = await Post.findById(id);
        if(userId !== post.author.toString()){
            return res.status(401).json({ error: 'You are not allowed to edit others post'})
        }
        const { title, content, price, file } = req.body;
        const updatedPost = await Post.findByIdAndUpdate(
            req.params.id,
            { title, content, price, file },
            { new: true }
        );
        res.json(updatedPost);
    } catch(err){
        res.status(500).json({ error: 'Failed to edit!'})
    }
})
module.exports = router;