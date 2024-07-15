const axios = require('axios');
require('dotenv').config();

const SPOONACULAR_API_KEY = process.env.SPOONACULAR_API_KEY;

// POST REQUEST FOR RECIPES
const recipesPost = async (req, res) => {
    const data = req.body.data;
    // console.log('Received data:', data);
    try {
      // Use the data from the request to search for recipes
      const searchQueries = data.join(',');
      const url = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${encodeURIComponent(searchQueries)}&number=10&apiKey=${SPOONACULAR_API_KEY}`;

      // Fetch recipes from Spoonacular
      const response = await axios.get(url);
      const recipes = response.data;
      console.log('Fetched recipes:', recipes);

      res.render('recipes', { recipes });
  } catch (error) {
      console.error('Error fetching recipes:', error);
      res.status(500).json({ error: 'Failed to fetch recipes' });
  }
}

const recipePost = async (req, res) => {
  const id = req.params.id;
  try {
    const url = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${SPOONACULAR_API_KEY}`;
    const response = await axios.get(url);
    const recipe = response.data;

    console.log(recipe)
    res.render('recipe', {recipe})

  } catch (error) {
    console.error('Error fetching recipe:', error);
    res.status(500).json({ error: 'Failed to fetch recipe' });
  }
}

module.exports = {
  recipesPost,
  recipePost
}
