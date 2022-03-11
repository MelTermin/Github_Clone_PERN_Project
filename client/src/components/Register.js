import React from 'react'
import {Link} from "react-router-dom"

function Register() {
  return (
    <div>
      <form>
        <label>Name</label>
        <input type="text" name="name" placeholder='Please type your name'/>

        <label>Password</label>
        <input type="password" name="password" placeholder='Please type your password'/>

        <label>Password</label>
        <input type="password" name="password" placeholder='Please type your password'/>
        
        <div>
          <p>Registered already ?</p>
          <Link to="/">Login</Link>
        </div>
      

        <button>Submit</button>
      </form>
    </div>
  )
}

export default Register