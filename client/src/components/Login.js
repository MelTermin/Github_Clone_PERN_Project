import React,{useState} from 'react'
import {Link} from "react-router-dom"

function Login() {
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");

  return (
    <div>
      <form>

        <label>Email</label>
        <input type="text" name="email" placeholder='Please type your email' value={email} onChange={(e)=>setEmail(e.target.value)}/>

        <label>Password</label>
        <input type="password" name="password" placeholder='Please type your password'  value={password} onChange={(e)=>setPassword(e.target.value)}/>

        <div>
          <p>Not registered already ?</p>
          <Link to="/register">Register</Link>
        </div>
      

        <button>Submit</button>
      </form>
    </div>
  )
}

export default Login