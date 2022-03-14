import React, { createContext, useContext, useEffect,useState } from "react";



export const GlobalContext = createContext();

export const GlobalProvider = ({children}) => {
  const [loading, setLoading] = useState(true)
  const [githubUser,setGithubUser]=useState([]);
  const [repos,setRepos]=useState([]);
  const [followersGit,setFollowersGit]=useState([]);
  const [error,setError]=useState("")
 
  


  useEffect(()=> {
    fetchGithubUser()
  },[])

  const fetchGithubUser= async (search) => {
    setLoading(true)
    if(search) {

      const response = await fetch (`https://api.github.com/users/${search}`)
      const data = await response.json()
      console.log("data", data)
      setGithubUser(data)

      const { login } = data;


      const response1= await fetch(`https://api.github.com/users/${login}/followers?per_page=50`);
      const data1= await response1.json()
      console.log("followers", data1)
      setFollowersGit(data1)

      const response2= await fetch(`https://api.github.com/users/${login}/repos?per_page=50`);
      const data2= await response2.json()
      console.log("repo", data2)
      setRepos(data2)
      setLoading(false)
        
  
      

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
    followersGit,
    setFollowersGit,
    repos,
    loading,
    setLoading


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