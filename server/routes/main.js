const express = require('express');
// const cookieParser = require('cookie-parser');
const router = express.Router();
require('dotenv').config();
const axios = require('axios');
const {requireAuth} = require('../../middleWare/authMiddleWare')
// const Post = require('../models/post');
const {
  recipesPost,
  recipePost,
  signup_get,
  login_get,
  signup_post,
  login_post,
  logout_get
} = require('../../controllers/RecipesController')

// Routes
router.get('', (req, res) => {
  // console.log(token)
  res.render('index')
})

// router.get('/about', (req, res) => {
//   res.render('about')
// })

router.post('/recipes', recipesPost);

router.get('/recipes/create', requireAuth, (req,res) => {
  res.render('search')
})

// router.get('*', checkUser);

router.get('/recipes/:id', recipePost);

router.get('/signup', signup_get)

router.post('/signup', signup_post)

router.get('/login', login_get)

router.post('/login', login_post)

router.get('/logout', logout_get)

module.exports = router;
