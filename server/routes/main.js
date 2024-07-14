const express = require('express');
const router = express.Router();
require('dotenv').config();
const axios = require('axios');
// const express = require('express');
// const axios = require('axios');
const path = require('path');

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

router.post('/recipes', async (req, res) => {
  const data = req.body.data;
    console.log('Received data:', data);
    const SPOONACULAR_API_KEY = process.env.SPOONACULAR_API_KEY;
    try {
      // Use the data from the request to search for recipes
      const searchQueries = data.join(','); // Combine the data into a single string for the query
      const url = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${encodeURIComponent(searchQueries)}&number=10&apiKey=${SPOONACULAR_API_KEY}`;

      // Fetch recipes from Spoonacular
      const response = await axios.get(url);
      const recipes = response.data;
      console.log('Fetched recipes:', recipes);

      // Render the 'recipe' view with the fetched recipes
      // res.render('recipes', { recipes });
      // res.json({ message: 'Recipes fetched successfully', recipes })
      res.render('recipe', { recipes });
  } catch (error) {
      console.error('Error fetching recipes:', error);
      res.status(500).json({ error: 'Failed to fetch recipes' });
  }
});

// router.post('/recipes', recipePost)

router.get('/recipes/create', (req,res) => {
  res.render('search')
})

router.post('/recipes', (req, res) => {
  console.log(req.body)
})

module.exports = router;
