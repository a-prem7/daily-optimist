

require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');

const PORT = 3000;
const methodOverride = require("method-override")
// Dependencies 
mongoose.connect(process.env.DATABASE_URL);


// Database Connection Error/Success
// Define callback functions for various events
const db = mongoose.connection
db.on('error', (err) => console.log(err.message + ' is mongo not running?'));
db.on('connected', () => console.log('mongo connected'));
db.on('disconnected', () => console.log('mongo disconnected'));

// Middleware and Body Parser

app.use(methodOverride("_method"))
app.use(express.urlencoded({ extended: false }));


// Routes / Controllers 
const blogsController = require('./controllers/blogs');
app.use('/blogs',blogsController);


app.use(express.static('public'))


app.listen(PORT, () => console.log(`server is listning on port: ${PORT}`));