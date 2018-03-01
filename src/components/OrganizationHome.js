import React, { Component } from 'react';
import { Route } from 'react-router';
import { Link } from 'react-router-dom';
import OrganizationCard from './OrganizationCard';
//const response = require('response');

export default class OrganizationHome extends Component {
  constructor(props) {
    super(props)
    this.state = {
      organization: {}
    };
  }

  getOrganization() {
    const { user } = this.props;

    fetch(`/api/v1/organization/${user.ghId}`)
    .then(response => response.json())
    .then(organizations => {
      this.setState({ organization: organizations[0] });
    })
    .catch(error => {
     console.log(error);
    });
  }

  componentWillMount() {
    this.getOrganization();
  }

  render() {
    return (
      <div className='edit-wrapper'>
        <OrganizationCard organization={this.state.organization || this.props.currentOrganization} />
        <Link className='organization-edit-link' to='/edit-organization'>EDIT PROFILE</Link>
      </div>
    )
  }
}

