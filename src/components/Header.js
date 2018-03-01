import React from 'react';


const Header = ({ user, clearState }) => {
  
  const logInOut = () => {
    if (!user) {
      return (
        <a id="log-in" href="http://localhost:3006/auth">
        Log In
        </a>
      )
    } else {
      return (
        <a id="log-out" href='/' onClick={(e) => {
          e.preventDefault();
          clearState();
        }}>
        LOG OUT
        </a>
      )
    }
  }

  return (
    <div className='app-header'>
    <h1>hireTap</h1>
      {logInOut()}
      
    </div>
  
  )
}

export default Header;