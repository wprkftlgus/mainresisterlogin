const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: { type: String, required: true},
    content: { type: String, required: true},
    author: { type: mongoose.Schema.Types.ObjectId, required: true},
    imageUrl: { type: String}, 
    timestamps: {}
});

module.exports = mongoose.model('Poost', postSchema);