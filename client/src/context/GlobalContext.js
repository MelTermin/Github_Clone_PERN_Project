import React, { createContext, useContext, useEffect,useState } from "react";



export const GlobalContext = createContext();

export const GlobalProvider = ({children}) => {
  const [currentUser, setCurrentUser]=useState([])
  

  useEffect(() => {
    getCurrentUser();
  }, []);

  // action: get current user
  const getCurrentUser = async () => {
    const token = localStorage.getItem("token");

    try {
      const res = await fetch("http://localhost:5000/api/current", {
        method: "GET",
        headers: { token: token }
      });
      const parseRes = await res.json();
      setCurrentUser(parseRes.data,"current") 

     
    } catch (err) {
      console.log(err);
      
    }
  };


  
  const value = {
   
    currentUser
   

  };

  return (
    <GlobalContext.Provider value={value}>
      {children}
    </GlobalContext.Provider>
  );
};

export function useGlobalContext() {
  return useContext(GlobalContext);
}