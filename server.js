

require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Blog = require('./models/blogs');
const PORT = 3000;
const methodOverride = require('method-override');
// Dependencies 
mongoose.connect(process.env.DATABASE_URL);


// Database Connection Error/Success
// Define callback functions for various events
const db = mongoose.connection
db.on('error', (err) => console.log(err.message + ' is mongo not running?'));
db.on('connected', () => console.log('mongo connected'));
db.on('disconnected', () => console.log('mongo disconnected'));

// Middleware and Body Parser

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"))



// I 

app.get('/blogs', async (req, res) => {
    const allBlogs = await Blog.find({})
    res.render('index.ejs', {
        blogs: allBlogs
    }
    );
  }); 
// New

app.get('/blogs/new', (req, res) => {
    res.render('new.ejs')

})


// Delete
app.delete('/blogs/:id', async (req, res) => {
 
    await Blog.findByIdAndDelete(req.params.id);

  res.redirect("/blogs")
})



// Update

app.put('/blogs/:id', async (req, res) => {
    await Blog.findByIdAndUpdate(
        req.params.id,
        req.body,
    );
    res.redirect(`/blogs/${req.params.id}`)
  });


// Create
app.post('/blogs', (req,res) => {

    const createdBlog = new Blog(req.body)
    createdBlog.save().then(res.redirect('/blogs'))
    
  })



// Edit

app.get("/blogs/:id/edit",async (req, res) => {
    const foundBlog = await Blog.findById(req.params.id).exec();
        res.render("edit.ejs", {
            blog: foundBlog,
        })
    })
  


// Show

app.get('/blogs/:id', async (req, res) => {
    const foundBlog = await Blog.findById(req.params.id).exec()
    res.render('show.ejs', {
        blog: foundBlog,
    });
  }); 
  




app.listen(PORT, () => console.log(`server is listning on port: ${PORT}`));