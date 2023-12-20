const express=require('express');
const cors=require('cors');
const ConnectDb=require('./Config/db')
require('dotenv').config();
const path=require("path")
const ejs=require('ejs')
const bodyParser=require('body-parser');
const mongoose =  require('mongoose')
const flash =  require('connect-flash')
const session = require('express-session')
const cookiepurser = require('cookie-parser')






const app=express();
ConnectDb()

app.use(cors());
app.use(flash())


//Body Parser for Collection of Data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname,'Public')))
app.use('/uploads',express.static('uploads'))
app.set('view engine','ejs')
app.set('views',"views")
app.use(session({
    cookie: {
        maxAge: 60000
    },
    secret: "rittika123",
    resave: false,
    saveUninitialized: false
}));

app.use(cookiepurser());

// API Port
const apiRoute=require("./Route/apiRoute");
app.use(apiRoute);


// Admin Route

const adminRoute=require("./Route/adminRoute")
app.use(adminRoute)





const port=process.env.PORT||9701
const dbDriver=process.env.MONGO_URL;
mongoose.connect(dbDriver,{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>{
    app.listen(port,()=>{
        console.log('db is connected');
        console.log(`server is running at http://localhost:${port}`);
    })
})
.catch(()=>{
    console.log('error');
})