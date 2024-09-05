const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const register = require('./controllers/auth');
const { setupWebSocketServer } = require('./services/websocketService');
const authRoutes = require('./routes/auth');
const battleRoutes = require('../server/routes/battleRoutes');
require('dotenv').config();

const port = process.env.PORT || 6000;
const mongoURL = process.env.MONGO_URL;

// Express application
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());




// HTTP Routes
// app.post("/auth/register", register);
app.use("/auth", authRoutes);
app.use("/battle", battleRoutes);

// MongoDB
mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
    // Start HTTP server
    const server = app.listen(port, () => {
        console.log(`Server running on http://localhost:${port}`);
    });

    // Setup WebSocket server
    setupWebSocketServer(server);

}).catch((err) => {
    console.log(err, "Failed to connect to MongoDB");
});
