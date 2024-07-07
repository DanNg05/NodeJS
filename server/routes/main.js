const express = require('express');
const router = express.Router();
const Post = require('../models/post');
const { fetchRecipesByIngredients } = require('./recipeAPI');


// Routes
router.get('', (req, res) => {
  res.render('index')
})

router.get('/about', (req, res) => {
  res.render('about')
})

router.post('/search', async (req, res) => {
  // const ingredients = req.body.ingredients; // Expecting an array of ingredients
  const ingredients = ["onion", "chicken breast"]

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

router.get('/search', (req,res) => {
  res.render('search')
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
