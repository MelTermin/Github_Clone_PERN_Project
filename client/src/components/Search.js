import React, {useState} from 'react'
import { useGlobalContext } from "../context/GlobalContext";



function Search() {
  const [search,setSearchTerm]=useState("");
  const {fetchGithubUser,error,setError } = useGlobalContext();
  


  const searchHandler= (e)=> {
      e.preventDefault();
 
      fetchGithubUser(search)
      setSearchTerm("")
      setError("")

  }

  return (
    <div className='search-wrapper'>
      <form onSubmit={searchHandler}>
        <input type="text" name="name" value= {search} onChange={(e)=>setSearchTerm(e.target.value)}></input>
        {error && <p>{error}</p>}
        <button>Search</button>
      </form>
     
      </div>
  )
}

export default Search