const mongoose = require('mongoose')
const { isEmail } = require('validator');
const bcrypt = require('bcrypt')
const FavoriteItem = require('./Favourite');
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Please enter an email'],
    unique: true,
    lowercase: true,
    validate: [isEmail, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'Please enter the password'],
    minLength: [6, 'Minimum password is 6 characters']
  },
  favorites: [{ type: String }]
})


// AFTER DOC SAVED TO DB
userSchema.post('save', function (doc, next) {

  next();
})

// STATIC METHOD TO LOGIN USER
userSchema.statics.login = async function(email, password) {
  const user = await this.findOne({email});
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error('Incorrect Password')
  }
  throw Error('Incorrect Email')
}

// BEFORE DOC SAVED TO DB
userSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next()
})
const User = mongoose.model('User', userSchema)

module.exports = User;
