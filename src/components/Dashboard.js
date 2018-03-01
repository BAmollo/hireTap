import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import './Dashboard.css';

const Dashboard = (props) => {
  // const {data} = props
  return (
    <div className='Dashboard'>
      <div className='Dashboard-content'>
        <div className='Dashboard-header'>
          <div className='Dashboard-user'/>
            <img
              className='Dashboard-user-image'
              src='http://via.placeholder.com/129x129'
              alt=''/>
            <div className='Dashboard-user-info'>
              <div className='Dashboard-user-info-name'>/div>
              <Link to='/profile'>
                <button className='Dashboard-user-info-button'>Edit Profile</button>
              </Link>
            </div>
          </div>
        </div>
        <div className='Dashboard-recommended'>
          <div className='Dashboard-recommended-header'>
            <div className='Dashboard-recommended-header-title'>Start Here</div>
            <div className='Dashboard-recommended-header-dropdown'>
              <div className='Dashboard-recommended-header-dropdown-label'>Sorted By</div>
              <div className='Dashboard-recommended-header-dropdown-box'>
                <select className="select-style">
                  <option value="1">First Name</option>
                  <option value="2">Last Name</option>
                  <option value="3">Gender</option>
                  <option value="4">School</option>
                  <option value="5">Location</option>
                  <option value="6">Major</option>
                  <option value="7">Interests</option>               
                  
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {data: state.data}
}
export default connect(mapStateToProps)(Dashboard);