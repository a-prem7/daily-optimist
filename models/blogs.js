
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema({
	title: String,
    description: String,
	body: String,
    img: String,
    topic: String,
    duration: Number,
    author: String
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;