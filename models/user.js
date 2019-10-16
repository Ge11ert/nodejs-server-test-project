const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId },
  email: { type: String, lowercase: true, unique: true },
  username: { type: String, unique: true },
  password: { type: String, minLength: 3, maxLength: 15 },
  refreshToken: { type: String },
});

userSchema.pre('save', async function preSave() {
  const salt = await bcrypt.genSalt(8);
  const hash = await bcrypt.hash(this.password, salt);
  this.password = hash;
});

userSchema.methods.comparePasswords = async function comparePasswords(candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

userSchema.statics.generateId = function generateId() {
  const id = new mongoose.Types.ObjectId();
  return id;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
