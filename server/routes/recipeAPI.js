const axios = require('axios');
require('dotenv').config();

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
    fetchRecipesByIngredients
};
