import React from 'react'
import {Link} from "react-router-dom"

function Login() {
  return (
    <div>
      <form>

        <label>Email</label>
        <input type="text" name="email" placeholder='Please type your email'/>

        <label>Password</label>
        <input type="password" name="password" placeholder='Please type your password'/>

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