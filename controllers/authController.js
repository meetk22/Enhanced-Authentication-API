const passport = require('passport');

exports.googleAuth = passport.authenticate('google', { scope: ['profile', 'email'] });

exports.googleCallback = passport.authenticate('google', { failureRedirect: '/login', session: false });

exports.googleRedirect = (req, res) => {
  const token = req.user.generateJwt(); // Assuming you have a method on the user model to generate JWT
  res.redirect(`/profile?token=${token}`);
};
