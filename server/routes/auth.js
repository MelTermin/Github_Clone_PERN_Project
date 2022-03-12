const express = require("express");
const router = express.Router();
const pool= require("../db")
const bcrypt=require("bcryptjs");
const { body, validationResult } = require('express-validator');
const jwt = require("jsonwebtoken");
const checkAuth = require ("../middleware/checkAuth");


router.get("/allusers",async(req,res)=>{
  try {
    //like this way the response console.log is en empty array
    //because in the begining there are no users
    //but you want to deconstruct the rows part
    const {rows}=  await pool.query("SELECT * FROM USERS")
    
    res.json(rows)

  } catch(error) {
    console.log(error)
  }
})

router.post("/register", body("email").isEmail().withMessage("The email is invalid"),body("password").isLength({min:6}).withMessage("The password must be six characters long"), async(req,res)=>{
  //first I need to check some validation about email,password
  try {
    const validationErrors=validationResult(req);
    
    if(!validationErrors.isEmpty()) {
      const errors=validationErrors.array().map((error)=> {
        return {
          msg:error.msg
        }
  
      })
      return res.json({errors});
    }
  
    //I will grab the these values from the frontend's name properrty
    const {email,password,name}=req.body;
  
  
    //checking if the email exists in the database
    const user= await pool.query("SELECT * FROM users WHERE user_email=$1", [email])
  
    if(user.rows.length !==0) {
      return res.json({
        errors: [
          {
            msg: "Email already in use",
          },
        ]
      })
    }
  
    const salt=await bcrypt.genSalt(10);
    const bcryptPassword = await bcrypt.hash(password, salt);
  
    const newUser=  pool.query("INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *", [name,email,bcryptPassword,])
  
    return res.status(201).json({
      success:true,
      message:"The registration was successfull"
    })

  } catch(error) {
    console.log(error)
  }


})

router.post("/login", async(req,res) => {

  try {
  const {email,password}=req.body;

  //checking the user query

  const user=await pool.query ("SELECT * FROM USERS WHERE user_email =$1",[email]);

  //if a user with that given email does not exists

  if(user.rows.length ===0) {
    return res.json({
      errors: [
        {
          msg: "Wrong Email entry",
        },
      ]
    })
  }

  // check if the password also true

  const validPassword = await bcrypt.compare(
    password, //from the frontend password comparing to the database
    user.rows[0].user_password
  );

  if (!validPassword) {
    return res.json({
      errors: [
        {
          msg: "Wrong Password",
        },
      ]
 
    });
  }

  // if everything checks out I wanna send the jsonwebtoken with success message

  req.user=user.rows[0];

  //create the payload

  payload={
    id:user.rows[0].user_id,
  }

  //check if the payload works properly
  // return res.json({
  //   payload
  // })

  //create the jsonwebtoken

  const token = jwt.sign(payload, process.env.SECRET, {
    expiresIn: "7d",
  });

  
  console.log(token)


  return res.status(200).cookie('token', token, { 
    httpOnly: true, 
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) })
    .json({
    success: true,
    message: 'Logged in succefully',
  })

  } catch(error) {
    console.log(error)
  }
  

})

router.get("/current", checkAuth, (req, res) => {
  try {
    return res.status(200).json({
      info: 'protected info',
      data:req.user
    })
  } catch (error) {
    console.log(error.message)
  }
});

router.get("/logout", (req,res)=>{
  try {
    return res.status(200).clearCookie('token', { httpOnly: true }).json({
      success: true,
      message: 'Logged out succefully',
    })

  }catch(error) {
    console.log(error)
  }
})



module.exports=router;