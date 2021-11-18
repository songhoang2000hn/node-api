const express = require("express");
const mongoose = require("mongoose");
const { MONGO_URI } = require("./config");
const bodyParser = require("body-parser");
const cors = require('cors');
// Create express app
const app = express();
// Routes
const postsRoutes = require("./routes/api/posts")

//Body Parser Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(function(req, res, next) {
  req.header("Access-Control-Allow-Origin", "*");
  req.header("Access-Control-Allow-Methods", "*");
  req.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});
// Connect to MongoDB
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected!"))
  .catch((err) => console.log(err));

// User routes
app.use("/api/posts", postsRoutes)

const PORT = process.env.PORT || 5000;
// Starting Server
app.listen(PORT, () => console.log(`Server run at port ${PORT}`));
