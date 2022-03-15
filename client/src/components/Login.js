import React,{useState} from 'react'
import {Link,useNavigate} from "react-router-dom"
import axios from "axios"
import loginImg from '../images/login-img.svg';


function Login() {
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState(""); 
  const [errors,setErrors]=useState([]);

  let navigate = useNavigate();

  const loginHandler= async (e)=> {
    e.preventDefault();

    const response= await axios.post("http://localhost:5000/api/login",{email,password,withCredentials: true
    }).then(data=> {
     //console.log(data.data)
      if(data.data.success===true) {
            localStorage.setItem("token",data.data.token)
            navigate("/profile")
      } else{
            setErrors(data.data.errors[0].msg)
      }
    })
  }

  return (
    <div className='login-wrapper'>
      <div>
        <img className='github-user-image' src={loginImg} alt='github user' />
      </div>
      <form onSubmit={loginHandler} className='login-form'>
        {errors && <small style={{color:"red", textAlign:"center", marginTop:"20px"}}>{errors}</small>}

        <label>Email:</label>
        <input type="text" name="email" placeholder='Please type your email' value={email} onChange={(e)=>setEmail(e.target.value)}/>

        <label>Password:</label>
        <input type="password" name="password" placeholder='Please type your password'  value={password} onChange={(e)=>setPassword(e.target.value)}/>

        <div className='register-direction'>
          <p>Not registered already ?</p>
          <Link className='link' to="/register">Register</Link>
        </div>
      

        <button className='btn'>Submit</button>
      </form>
    </div>
  )
}

export default Login