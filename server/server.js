const express=require("express");
const app=express();
const cors=require("cors");
const path = require('path')
const env=require('dotenv')
env.config();

app.use(cors());
app.use(express.json());//this code allows me to access req.body





app.listen(process.env.PORT,()=> {
  console.log(`the server is running on port` + process.env.PORT)
})