import React, { Component } from 'react';

export const Callback = props => {
  const login = (code) => {
    if (!code || props.user) {
      return
    }
    fetch(`/gh_auth_code/${code}`, { method: 'POST' })
    .then(resp => {
      return resp.json()
    })
    .then(data => {
      let wholeString = data.split("=")[1];
      if(!wholeString.includes('error')) {
      fetchUser(wholeString.split('&')[0]);
      }
    })
    .catch(error => {
      console.log('Error retreiving github authorization code: ', error);
    });

  };

  const postLoginRedirect = (ghId) => {
    fetch(`/api/v1/students/${ghId}`)
    .then(response => response.json())
    .then(data => {
      if (data[0]) {
        props.history.replace('/student-profile');
      } else {
        fetch(`/api/v1/organizations/${ghId}`)
        .then(resp => resp.json())
        .then(organizationData => {
          if (organizationData[0]) {
            props.history.replace('/organization-profile');
          } else {
            props.history.replace('/choose-status');
          }
        })
        .catch(error => {
          console.log('Error retreiving info: ', error);
        });
      }
    });
  };

  const fetchUser = (token) => {

    fetch(`/gh_auth_token/${token}`, {
      method: 'GET'
    })
    .then(resp => {
      return resp.json()
    })
    .then(data => {
      const userData = JSON.parse(data);
      const { avatar_url, name, location, company, bio }  = userData;
      const user = {
        avatar_url,
        ghId: userData.id,
        name,
        location,
        company,
        bio
      }
      props.setUser(user);
      postLoginRedirect(user.ghId);
    })
    .catch(error => {
      console.log('Error retreiving github authorization token: ', error);
    });
  };

  login(props.code);

  return(
    <div></div>
  )
}
