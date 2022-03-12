import React from 'react'
import { useGlobalContext } from "../context/GlobalContext";
import { useNavigate } from "react-router-dom";

function Profile() {
  const { currentUser } = useGlobalContext();
  const navigate = useNavigate();

  //console.log("current user", currentUser)

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
    <div>
      <p>Hello {currentUser.name}</p>
      <button onClick={e => logout(e)} className="btn btn-primary">
        Logout
      </button>
    </div>
    
  )
}

export default Profile