const { type } = require('@testing-library/user-event/dist/type');
const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    title : {type: String, required: true},
    content: {type: String, required: true}
})

module.exports = mongoose.model('Comment', commentSchema);