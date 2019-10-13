const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, lowercase: true, unique: true },
  username: { type: String, unique: true },
  password: { type: String, minLength: 3, maxLength: 15 },
});

userSchema.methods.comparePasswords = function comparePasswords(candidatePassword) {
  return (candidatePassword === this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;