const mongoose = require('mongoose')
const { isEmail } = require('validator');
const bcrypt = require('bcrypt')

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
  }
})


// AFTER DOC SAVED TO DB
userSchema.post('save', function (doc, next) {

  next();
})

// BEFORE DOC SAVED TO DB
userSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next()
})
const User = mongoose.model('User', userSchema)

module.exports = User;