import React, {useState} from 'react'
import { useGlobalContext } from "../context/GlobalContext";
import Detail from './Detail';



function Search() {
  const [search,setSearchTerm]=useState("");
  const [click,setClick]=useState(false);
  const {fetchGithubUser} = useGlobalContext();
  


  const searchHandler= (e)=> {
      e.preventDefault();
 
      fetchGithubUser(search)
      setSearchTerm("")
      setClick(true)

  }

  return (
    <div className='search-wrapper'>
      <form onSubmit={searchHandler}>
        <input type="text" name="name" value= {search} onChange={(e)=>setSearchTerm(e.target.value)} placeholder='Please type username'></input>
        <button className='btn'>Search</button>
      </form>
      {click && <Detail/>}
     
      </div>
  )
}

export default Search