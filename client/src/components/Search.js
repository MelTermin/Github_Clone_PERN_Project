import React, {useState} from 'react'
import { useGlobalContext } from "../context/GlobalContext";
import Detail from './Detail';



function Search() {
  const [search,setSearchTerm]=useState("");
  const [click,setClick]=useState(false);
  const {fetchGithubUser,error,setError } = useGlobalContext();
  


  const searchHandler= (e)=> {
      e.preventDefault();
 
      fetchGithubUser(search)
      setSearchTerm("")
      setError("")
      setClick(true)

  }

  return (
    <div className='search-wrapper'>
      <form onSubmit={searchHandler}>
        <input type="text" name="name" value= {search} onChange={(e)=>setSearchTerm(e.target.value)}></input>
        {error && <p>{error}</p>}
        <button>Search</button>
      </form>
      {click && <Detail/>}
     
      </div>
  )
}

export default Search