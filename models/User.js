const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  photo: String,
  bio: String,
  phone: String,
  isPublic: { type: Boolean, default: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  googleId: String,
});

userSchema.methods.generateJwt = function() {
  return jwt.sign({ userId: this._id, role: this.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

module.exports = mongoose.model('User', userSchema);
