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
        res.json({message : 'Comment posted successfully!'})
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

router.delete('/delete/:commentId', authMiddleware , async (req,res) => {
    try{
        const commentId = req.params.commentId;
        const willDelete = await Comment.findById(commentId);

        if(!willDelete){
            return res.status(404).json({ error: 'Comment not found'});
        }
        if(req.user.id !== willDelete.author.toString()){
            return res.status(403).json({ error: "You can't delete other's comment!"});
        }
        await Comment.findByIdAndDelete(commentId);
        return res.json({ message: 'Comment Deleted Succesfully!'});
    } catch(err) {
        res.status(500).json({ error: 'Failed to delete'});
    }
})
module.exports = router;