const express = require('express');
const router = express.Router();
require('dotenv').config();
const axios = require('axios');

// const Post = require('../models/post');
const {
  recipePost
} = require('../../controllers/RecipesController')

// Routes
router.get('', (req, res) => {
  res.render('index')
})

router.get('/about', (req, res) => {
  res.render('about')
})

// router.post('/search', recipePost);

router.post('/recipes', recipePost);

// router.post('/recipes', recipePost)

router.get('/recipes/create', (req,res) => {
  res.render('search')
})

router.post('/recipes', (req, res) => {
  console.log(req.body)
})

module.exports = router;
