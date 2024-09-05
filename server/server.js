const express = require('express');
const app = express();
const cors = require('cors'); 
const mongoose = require('mongoose');
const helmet = require('helmet');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const {register}= require('./controllers/auth');
const verifyToken = require('./middlewares/auth');
const { fileURLToPath } = require('url');
const path = require('path');
require('dotenv').config();
const port = process.env.PORT || 6000;
const mongoURL = process.env.MONGO_URL;



app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());




//Routes with files

app.post("/auth/register",register);


//Routes

app.use("/auth", authRoutes);


// Mongoose setup


mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>{
    app.listen(port,()=> console.log(`Server Port: ${port}` ));

    // User.insertMany(users);
    // Post.insertMany(posts);
}).catch((err)=>{
    console.log(err,"did not connected");
});