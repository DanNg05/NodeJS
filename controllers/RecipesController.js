const axios = require('axios');
require('dotenv').config();
const User = require('../server/models/User')
const jwt = require('jsonwebtoken');
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
    const token = req.cookies.jwt;

    console.log(recipe)
    res.render('recipe', {recipe, token})

  } catch (error) {
    console.error('Error fetching recipe:', error);
    res.status(500).json({ error: 'Failed to fetch recipe' });
  }
}

// HANDLE ERROR

const handleErrors = (err) => {
  console.log(err.message, err.code)
  let errors = { email: '', password: ''}

  // incorrect email
  if (err.message === 'Incorrect Email') {
    errors.email = 'that email is not registered'
  }

  // incorrect password
  if (err.message = 'Incorrect Password') {
    errors.password = 'that password is incorrect'
  }


  // duplicate error code
  if (err.code === 11000) {
    errors.email = 'that email is already registered'
    return errors;
  }
  // validattion errors
  if (err.message.includes('User validation failed')) {
    Object.values(err.errors).forEach(({properties}) => {
      errors[properties.path] = properties.message;
      // console.log(properties.message)
    })
  }

  return errors
}


// CREATE TOKEN
  const secret = process.env.SECRET_TOKEN;
  const maxAge = 3 * 24 * 60 *60;
  const createToken = (id) => {
    return jwt.sign({ id }, secret, {
      expiresIn: maxAge
    })
  }

// AUTHENTICATION ROUTES
const signup_get = (req, res) => {

  res.render('signup')
}


const login_get = (req, res) => {

  res.render('login')
}

const signup_post = async (req, res) => {
  const {email, password} = req.body;

  try {
    const user = await User.create({email, password});
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000});
    res.status(201).json({user: user._id})
  }
  catch (err) {
    const errors = handleErrors(err)
    res.status(400).json( {errors} )
  }
}

const login_post = async (req, res) => {
  const {email, password} = req.body;

  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000});
    res.status(200).json({user: user._id})
  }
  catch (err) {
    const errors = handleErrors(err)
    res.status(400).json({errors})
  }
}

const logout_get = (req, res) => {
  res.clearCookie('jwt');
  res.redirect('/')
}
module.exports = {
  recipesPost,
  recipePost,
  signup_get,
  login_get,
  signup_post,
  login_post,
  logout_get
}
