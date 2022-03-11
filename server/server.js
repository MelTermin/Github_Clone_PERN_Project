const express=require("express");
const app=express();
const cors=require("cors");
const path = require('path')
const cookieParser = require('cookie-parser')
const passport = require('passport')
const env=require('dotenv')
env.config();

//import routers
const authRoutes=require("./routes/auth");

app.use(cors());
app.use(cookieParser())
app.use(express.json());//this code allows me to access req.body

//initialize
app.use("/api", authRoutes)
//in order to see http://localhost:5000/api/



app.listen(process.env.PORT,()=> {
  console.log(`the server is running on port` + process.env.PORT)
})