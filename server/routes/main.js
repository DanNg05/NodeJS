const express = require('express');
const router = express.Router();
require('dotenv').config();
const axios = require('axios');

// const Post = require('../models/post');
const {
  recipesPost,
  recipePost,
  signup_get,
  login_get,
  signup_post,
  login_post
} = require('../../controllers/RecipesController')

// Routes
router.get('', (req, res) => {
  res.render('index')
})

router.get('/about', (req, res) => {
  res.render('about')
})

router.post('/recipes', recipesPost);

router.get('/recipes/create', (req,res) => {
  res.render('search')
})

router.get('/recipes/:id', recipePost);

router.get('/signup', signup_get)

router.post('/signup', signup_post)

router.get('/login', login_get)

router.post('/login', login_post)

module.exports = router;
