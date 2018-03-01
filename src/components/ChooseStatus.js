import React from 'react';
import { Link } from 'react-router-dom';

export const ChooseStatus = (props) => {

  return (
    <div>
      <h2>I AM A:</h2>
      <div className='choose-link-box'>
        <Link to='/edit-student' className='button' className='choose-link'>STUDENT</Link>
        <Link to='/edit-organization' className='choose-link'>ORGANIZATION</Link>
      </div>
    </div>
  )
}