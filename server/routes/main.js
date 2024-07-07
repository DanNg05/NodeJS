const express = require('express');
const router = express.Router();
// const Post = require('../models/post');
const { fetchRecipesByIngredients } = require('./recipeAPI');


// Routes
router.get('', (req, res) => {
  res.render('index')
})

router.get('/about', (req, res) => {
  res.render('about')
})

router.post('/search', async (req, res) => {
  // console.log(req.body.ingredients)
  let ingredients = req.body.ingredients; // Expecting an array of ingredients
  // console.log(req.body)
  // const ingredients = ["onion", "chicken breast"]

  ingredients = ingredients.split(',');
  console.log(ingredients)
  if (!ingredients || ingredients.length === 0) {
      return res.status(400).json({ error: 'Ingredients are required' });
  }

  try {
      const recipes = await fetchRecipesByIngredients(ingredients);
      console.log(recipes); // Log the result to the console

      res.render('recipes', { recipes }); // Render the EJS template with the recipes data
  } catch (error) {
      res.status(500).json({ error: 'An error occurred while searching for recipes' });
  }
});



router.get('/recipes/create', (req,res) => {
  res.render('search')
})

router.post('/recipes', (req, res) => {
  console.log(req.body)
})

module.exports = router;
