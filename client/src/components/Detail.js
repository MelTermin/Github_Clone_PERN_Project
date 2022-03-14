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
          <GoRepo size={40} className='icon'/>
          <div>
            <p className='numbers'>{public_repos}</p>
            <small>Repos</small>
          </div>
          
        </div>

        <div className='card'>
          <FiUsers size={40} className='icon-user'/>
          <div>
            <p className='numbers'>{followers}</p>
            <small> Followers</small>
          </div>
         
        </div>

        <div className='card'>
          <FiUserPlus size={40} className='icon-followers'/>
          <div>
            <p className='numbers'>{following}</p>
            <small> Following</small>
          </div>
        
        </div>
      </div>

      <div className='second-detail-wrapper'>
        <img src={avatar_url} alt={name}/>
        <p>{name}</p>
        <a href={html_url}>follow</a>
        <p className='bio'>{bio}</p>

      </div>

      <div className='followers'>
        {followersGit.map((item,index)=>{
          return (
            <div key={index} >
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