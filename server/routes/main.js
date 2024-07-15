const express = require('express');
const router = express.Router();
require('dotenv').config();
const axios = require('axios');

// const Post = require('../models/post');
const {
  recipesPost,
  recipePost
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

router.get('/recipes/:id', recipePost)

module.exports = router;
