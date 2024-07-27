const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require('../server/models/User')

const secret = process.env.SECRET_TOKEN;
const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  // CHECK JSON WEB TOKEN EXISTENCE
  if (token) {
    jwt.verify(token, secret, (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.redirect('/login');
      } else {
        console.log(decodedToken);
        next();
      }
    })
  }
  else {
    res.redirect('/login')
  }
}

const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, secret, async (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.locals.user = null;
        next();
      } else {
        console.log(decodedToken);
        let user = await User.findById(decodedToken.id);
        res.locals.user = user;
        next();
      }
    })
  }
  else {
    res.locals.user = null;
    next();
  }
}

module.exports = {
  requireAuth,
  checkUser
}
