const express = require('express');
const blogRouter = express.Router();
const Blog = require('../models/blogs');


// Routes


// I 

blogRouter.get('/blogs', async (req, res) => {
    const allBlogs = await Blog.find({})
    res.render('index.ejs', {
        blogs: allBlogs
    }
    );
  }); 
// New

blogRouter.get('/blogs/new', (req, res) => {
    res.render('new.ejs')

})


// Delete
blogRouter.delete('/blogs/:id', async (req, res) => {
 
    await Blog.findByIdAndDelete(req.params.id);

  res.redirect("/blogs")
})



// Update

blogRouter.put('/blogs/:id', async (req, res) => {
    await Blog.findByIdAndUpdate(
        req.params.id,
        req.body,
    );
    res.redirect(`/blogs/${req.params.id}`)
  });


// Create
blogRouter.post('/blogs', (req,res) => {

    const createdBlog = new Blog(req.body)
    createdBlog.save().then(res.redirect('/blogs'))
    
  })



// Edit

blogRouter.get("/blogs/:id/edit",async (req, res) => {
    const foundBlog = await Blog.findById(req.params.id).exec();
        res.render("edit.ejs", {
            blog: foundBlog,
        })
    })
  


// Show

blogRouter.get('/blogs/:id', async (req, res) => {
    const foundBlog = await Blog.findById(req.params.id).exec()
    res.render('show.ejs', {
        blog: foundBlog,
    });
  }); 
  






module.exports = blogRouter;