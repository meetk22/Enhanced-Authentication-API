const User = require('../models/User');

// Get Profile
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update Profile
exports.updateProfile = async (req, res) => {
  try {
    const { name, photo, bio, phone, email, password, isPublic } = req.body;
    const user = await User.findById(req.user.userId);

    if (name) user.name = name;
    if (photo) user.photo = photo;
    if (bio) user.bio = bio;
    if (phone) user.phone = phone;
    if (email) user.email = email;
    if (password) user.password = await bcrypt.hash(password, 12);
    if (isPublic !== undefined) user.isPublic = isPublic;

    await user.save();
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// List Public Profiles
exports.listPublicProfiles = async (req, res) => {
  try {
    const users = await User.find({ isPublic: true });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// List All Profiles (Admin)
exports.listAllProfiles = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};