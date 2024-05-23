const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.authenticate = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ message: 'Access denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).json({ message: 'Invalid token' });
  }
};

exports.authorizeAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.userId);
    if (user.role !== 'admin') return res.status(403).json({ message: 'Access denied' });
    next();
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
};
