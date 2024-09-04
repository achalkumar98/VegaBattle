const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const {register}= require('./controllers/auth');
const verifyToken = require('./middlewares/auth');
const cors = require('cors');
const multer = require('multer');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const {fileURLToPath} = require('url');

const User = require('./models/User');
require('dotenv').config();
const port = process.env.PORT || 3000;
const mongoURL = process.env.MONGO_URL;

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);


app.use(express.json());
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null,"public/assets");
    },

    filename: (req,file,cb)=>{
        cb(null,file.originalname);
    }
});

const upload = multer({storage});


app.post("/auth/register", upload.single("picture"),register);
app.post("/auth/register", upload.single("picture"),register);

//Routes

app.use("/auth", authRoutes);


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
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });