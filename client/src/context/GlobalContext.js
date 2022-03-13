import React, { createContext, useContext, useEffect,useState } from "react";



export const GlobalContext = createContext();

export const GlobalProvider = ({children}) => {
  const [githubUser,setGithubUser]=useState([]);
  const [repos,setRepos]=useState([]);
  const [followers,setFollowers]=useState([]);
  const [error,setError]=useState("")
 
  


  useEffect(()=> {
    fetchGithubUser()
  },[])

  const fetchGithubUser= async (search) => {
    if(search) {

      const response = await fetch (`https://api.github.com/users/${search}`)
      const data = await response.json()
      console.log("data", data)
      setGithubUser(data)

      const { login } = data;


      const response1= await fetch(`https://api.github.com/users/${login}/followers`);
      const data1= await response1.json()
      console.log("followers", data1)
      setFollowers(data1)

      const response2= await fetch(`https://api.github.com/users/${login}/repos`);
      const data2= await response2.json()
      console.log("repo", data2)
      setRepos(data2)

        
  
      

    } else {
      setError("Please type a name")
    }


  }
  
  
  const value = {
    fetchGithubUser,
    githubUser,
    setGithubUser,
    error,
    setError,
    followers,
    setFollowers


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