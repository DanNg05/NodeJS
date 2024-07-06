const express = require('express');
const router = express.Router();
const Post = require('../models/post')
// Routes
router.get('', (req, res) => {
  res.render('index')
})

// function insertPostData () {
//   Post.insertMany([
//     {
//       title: "Hello there",
//       body: "I dont know what to do"
//     }
//   ])
// }
// insertPostData();
module.exports = router;
