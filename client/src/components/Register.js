import React,{useState} from 'react'
import {Link,useNavigate} from "react-router-dom"
import axios from "axios"

function Register() {
  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [errors,setErrors]=useState([]);
  
  
  let navigate = useNavigate();

  const submitHandler= async(e)=>{
    e.preventDefault();

   
      const response= await axios.post("http://localhost:5000/api/register",{ name, password,email
      }).then(data=> {
        console.log(data.data)
        if(data.data.success===true) {
          navigate("/")
        } else{
          setErrors(data.data.errors[0].msg)
        }
      })
    
  }

  return (
    <div>
      <form onSubmit={submitHandler}>
        {errors && <small style={{color:"red"}}>{errors}</small>}
        
        <label>Name</label>
        <input type="text" name="name" placeholder='Please type your name' value={name} onChange={(e)=>setName(e.target.value)}/>

        <label>Email</label>
        <input type="text" name="email" placeholder='Please type your email' value={email} onChange={(e)=>setEmail(e.target.value)}/>

        <label>Password</label>
        <input type="password" name="password" placeholder='Please type your password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
        
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