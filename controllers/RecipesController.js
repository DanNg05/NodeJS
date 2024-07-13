// const { fetchRecipesByIngredients } = require('');
const axios = require('axios');
require('dotenv').config();


// POST REQUEST FOR RECIPES
const recipePost = async (req, res) => {

  // const ingredient = document.querySelector('#ingredients');
  // console.log(ingredient.value);
  let ingredients = req.body.ingredients; // Expecting an array of ingredients
  console.log(req.body)
  ingredients = ingredients.split(',');
  // console.log(ingredients)
  if (!ingredients || ingredients.length === 0) {
      return res.status(400).json({ error: 'Ingredients are required' });
  }

  try {
      const recipes = await fetchRecipesByIngredients(ingredients);
      // console.log(recipes);

      res.render('recipes', { recipes });
  } catch (error) {
      res.status(500).json({ error: 'An error occurred while searching for recipes' });
      // console.log(error)
  }
};


const SPOONACULAR_API_KEY = process.env.SPOONACULAR_API_KEY;

const fetchRecipesByIngredients = async (ingredients) => {
    try {
        const response = await axios.get('https://api.spoonacular.com/recipes/findByIngredients', {
            params: {
                ingredients: ingredients.join(','),
                number: 10, // Number of results to return
                apiKey: SPOONACULAR_API_KEY
            }
        });

        return response.data;
    } catch (error) {
        console.error('Error fetching recipes:', error);
        throw new Error('Failed to fetch recipes');
    }
};


module.exports = {
  recipePost
}
