require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');
const { errorHandler } = require('./middleware/errorMiddleware');
require('./config/passport');

const app = express();

app.use(bodyParser.json());
app.use(passport.initialize());

app.use('/auth', authRoutes);
app.use('/profiles', profileRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI, {})
  .then(() => {
    console.log('CONNECTED TO DATABASE SUCCESSFULLY');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('COULD NOT CONNECT TO DATABASE:', err.message);
  });
