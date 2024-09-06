const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer'); 
const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profileRoutes');
const userRoutes = require('./routes/users');
const { matchUsers, submitAnswer } = require('./controllers/battleController');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 6000;
const mongoURL = process.env.MONGO_URL;

const upload = multer(
  
); 


app.use(express.json());
app.use(helmet());
app.use(morgan('common'));
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());


app.use('/auth', upload.none(), authRoutes); 
app.use('/profile', profileRoutes);
app.use('/users', userRoutes);



mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');

    
    const server = app.listen(port, () => {
      console.log(`HTTP server running on http://localhost:${port}`);
    });

  })
  .catch((err) => console.error('Failed to connect to MongoDB:', err));
