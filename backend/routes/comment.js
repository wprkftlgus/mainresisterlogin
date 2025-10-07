const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();
const Comment = require('../models/comment');
const comment = require('../models/comment');


router.post('/create', authMiddleware, async (req,res) => {
    try {
        const {content, postId} = req.body;
        const newComment = new Comment({
        content, author: req.user.id, post: postId })
        await newComment.save();
        res.json({message : 'Susees!'})
    } catch(err){
        console.error(err);
        res.status(500).json({ error : 'Failed to upload comment!'})
    }
});

router.get('/fetchcomments/:postId', async (req,res) => {
    try {
        const comments = await Comment.find({ post: req.params.postId}).populate('author');
        if(!comments){
            return res.status(400).json({ error: 'comments is not set'});
        }
        await res.json(comments);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch comments...'});
    }
})

router.delete('/delete/:commentId', authMiddleware, async (req,res) => {
    try{
        const commentId = req.params.commentId;

        if(!deleted){
            return res.status(404).json({ error: 'Comment not found'});
        }
        if(req.user.email !== commentId.author.email){
            return res.status(403).json({ error: "You can't delete other's comment!"});
        }
        const deleted = await Comment.findByIdAndDelete(commentId);
        res.json({ message: 'Comment Deleted Succesfully!'});
    } catch(err) {
        res.status(500).json({ error: 'Failed to delete'});
    }
})
module.exports = router;