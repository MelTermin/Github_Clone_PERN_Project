import React, { createContext, useContext, useEffect,useState } from "react";



export const GlobalContext = createContext();

export const GlobalProvider = ({children}) => {
  const [currentUser, setCurrentUser]=useState([])
  

  // useEffect(() => {
  //   getCurrentUser();
  // }, []);

  // // action: get current user
  // const getCurrentUser = async () => {
  //   try {
  //     const response = await fetch("http://localhost:5000/api/current");
  //     const data= await response.json()
  //     console.log(data)

     
  //   } catch (err) {
  //     console.log(err);
      
  //   }
  // };


  
  const value = {
   
    // getCurrentUser,
   

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