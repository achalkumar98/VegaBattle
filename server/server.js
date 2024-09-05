const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer'); // Import multer
const authRoutes = require('./routes/auth');
const { matchUsers, submitAnswer } = require('./controllers/battleController');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 6000;
const mongoURL = process.env.MONGO_URL;

// Configure multer
const upload = multer(); // Initialize multer

// Middleware
app.use(express.json());
app.use(helmet());
app.use(morgan('common'));
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());

// Routes
app.use('/auth', upload.none(), authRoutes); // Ensure route is prefixed with '/auth'
app.post('/battle/match/:username', matchUsers);
app.post('/battle/submit', submitAnswer);

// Database connection
mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');

    // Start HTTP server
    const server = app.listen(port, () => {
      console.log(`HTTP server running on http://localhost:${port}`);
    });

    // Import WebSocket server
    require('./services/websocketService'); // Ensure this file is correctly referenced and exports the WebSocket server logic
  })
  .catch((err) => console.error('Failed to connect to MongoDB:', err));
