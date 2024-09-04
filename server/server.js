const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();
const port = process.env.PORT || 3000;
const mongoURL = process.env.MONGO_URL;

app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));

app.get('/', (req, res) => {
    res.send('Hello World!');
    });

    mongoose.connect(mongoURL,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
    }).then(()=>{
        app.listen(port,()=> console.log(`Server Port: ${port}` ));
    
        // User.insertMany(users);
        // Post.insertMany(posts);
    }).catch((err)=>{
        console.log(err,"did not connected");
    });