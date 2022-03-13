import React from 'react'
import { useGlobalContext } from "../context/GlobalContext";
import { GoRepo, } from 'react-icons/go';
import { FiUsers, FiUserPlus } from 'react-icons/fi'
function Detail() {
  const {githubUser,loading, followersGit} = useGlobalContext();
  const { public_repos, followers, following,name,avatar_url,html_url,bio } = githubUser;

  if(loading) {
    return(
      <div style={{textAlign:"center", fontSize:"35px"}}>Loading..</div>
    ) 
  }
  
  return (
    <div className='detail-wrapper'>
      <div className='first-detail-wrapper'>

        <div className='card'>
          <GoRepo className='icon'/>
          <p><span>Repos: </span>{public_repos}</p>
        </div>

        <div className='card'>
          <FiUsers className='icon'/>
          <p><span>Followers:</span>{followers}</p>
        </div>

        <div className='card'>
          <FiUserPlus className='icon'/>
          <p><span>Following: </span>{following}</p>
        </div>
      </div>

      <div className='second-detail-wrapper'>
        <img src={avatar_url} alt={name}/>
        <p>{name}</p>
        <a href={html_url}>follow</a>
        <p className='bio'>{bio}</p>

      </div>

      <div className='followers'>
        {followersGit.map((item)=>{
          return (
            <div >
              <img src={item.avatar_url} alt={item.login}/>
              <p>{item.login}</p>
              <p>{item.html_url}</p>
            </div>
          )
        })}
      </div>

      
    </div>
  )
}

export default Detail