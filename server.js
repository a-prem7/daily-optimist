

require('dotenv').config();

const express = require('express');

const app = express();
const mongoose = require('mongoose');

const methodOverride = require('method-override');
// Dependencies 
mongoose.connect(process.env.DATABASE_URL);


// Database Connection Error/Success
// Define callback functions for various events
const db = mongoose.connection
db.on('error', (err) => console.log(err.message + ' is mongo not running?'));
db.on('connected', () => console.log('mongo connected'));
db.on('disconnected', () => console.log('mongo disconnected'));