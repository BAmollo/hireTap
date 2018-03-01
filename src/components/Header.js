import React from 'react';


const Header = ({ user, clearState }) => {
  
  const logInOut = () => {
    if (!user) {
      return (
        <a id="log-in" href={process.env.REACT_APP_BASEURL+'/auth'}>
        Log In
        </a>
      )
    } else {
      return (
        <a id="log-out" href={`${process.env.REACT_APP_BASEURL}/auth/logout`} onClick={(e) => {
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
