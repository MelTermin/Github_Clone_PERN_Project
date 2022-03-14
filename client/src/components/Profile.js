import React,{useEffect,useState} from 'react'
// import { useGlobalContext } from "../context/GlobalContext";
import { useNavigate } from "react-router-dom";

import Search from './Search';

function Profile() {
  // const {githubUser} = useGlobalContext();
  const [currentUser, setCurrentUser]=useState([])
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if(token) {
      getCurrentUser();
    }

  }, []);

  
  const getCurrentUser = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/current", {
        method: "GET",
        headers: { token: token }
      });
      const parseRes = await res.json();
      //console.log(parseRes)
      setCurrentUser(parseRes.data,"current") 
    } catch (err) {
      console.log(err);
      
    }
  };


  const logout = async e => {
    e.preventDefault();
    try {
      localStorage.removeItem("token");
      navigate("/");
      
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className='profile-wrapper'>
      <div className='navbar'>
        <p className='welcome-title'>Welcome {currentUser.name}</p>
        <button onClick={e => logout(e)} className="btn">
          Logout
        </button>
      </div>
      <Search/>
  
    </div>
    
    
  )
}

export default Profile