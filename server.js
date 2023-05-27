require("dotenv").config();
const { PORT = 3000, MONGODB_URL } = process.env;

const express = require("express");
const app = express();
const mongoose = require("mongoose");

const methodOverride = require("method-override");
// Dependencies
// mongoose.connect(process.env.DATABASE_URL);
mongoose.connect(MONGODB_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

// Database Connection Error/Success
// Define callback functions for various events
// const db = mongoose.connection
// db.on('error', (err) => console.log(err.message + ' is mongo not running?'));
// db.on('connected', () => console.log('mongo connected'));
// db.on('disconnected', () => console.log('mongo disconnected'));
mongoose.connection
  .on("open", () => console.log("You are connected to mongoose"))
  .on("close", () => console.log("You are disconnected from mongoose"))
  .on("error", (error) => console.log(error));

// Middleware and Body Parser

app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: false }));

// Routes / Controllers
const blogsController = require("./controllers/blogs");
app.use("/", blogsController);

app.use(express.static("public"));

app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));
