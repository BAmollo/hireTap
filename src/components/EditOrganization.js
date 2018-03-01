import React, { Component } from 'react';
import { Route } from 'react-router';
import OrganizationHome from './OrganizationHome';

export default class EditOrganization extends Component {
  constructor(props) {
    super(props);
    this.state = {
      organization: {
        location: '',
        type_of_business: '',
        gh_id: this.props.user.ghId,
        avatar_url: this.props.user.avatar_url
      },
    };
  }

  updateProperty(event) {
    const { name, value } = event.target;

    this.setState({
      organization: Object.assign(this.state.organization, {
        [name]: value
      })
    })
  }

  updateCheckboxes (event) {
    const { name, value } = event.target;

    if (this.state.organization.location.includes(`${value}`)) {
      return
    } else {
      this.setState({
        mentor: Object.assign(this.state.organization, {
          location: this.state.organization[name] + ' ' + value
        })
      })
    }
  }

  EditOrganization(event) {
    event.preventDefault();
    const { organization } = this.state;

    if (this.state.PATCH) {
      fetch(`/api/v1/organizations/${organization.gh_id}`, {
        method: 'PATCH',
        body: JSON.stringify(organization),
        headers: {
          'CONTENT-TYPE': 'application/json'
        }
      })
        .then(() => {
          fetch(`/api/v1/organizations/${organization.gh_id}`)
            .then(response => response.json())
            .then(Organization => {
              this.props.setOrganization(Organization[0]);
            })
            .catch(error => console.log(error))
        })
        .catch(error => {
          this.setState({
            errorStatus: 'Error editing profile; please make sure the form is accurately filled out'
          })
        })
    } else {
      fetch('/api/v1/organizations', {
        method: 'POST',
        body: JSON.stringify(organization),
        headers: {
          'CONTENT-TYPE': 'application/json'
        }
      })
        .then(() => {
          fetch(`/api/v1/organizations/${this.state.mentor.gh_id}`)
            .then(response => response.json())
            .then(Organization => {
              console.log('Trying to set organization: ', Organization[0]);
              this.props.setOrganization(Organization[0]);
            })
            .catch(error => console.log(error))
        })
        .catch(error => {
          this.setState({
            errorStatus: 'Error creating profile; please make sure the form is accurately filled out'
          })
        })
    }
  }

  toggleClass(event) {
    const { value } = event.target;

    this.setState({
      [value]: !this.state[value]
    })
  }

  checkDatabase() {
    const { ghId } = this.props.user;

    fetch(`/api/v1/organizations/${ghId}`)
      .then(response => response.json())
      .then(organization => {
        if (organization.length === 1) {
          this.setState({
            mentor: Object.assign(this.state.organization, organization[0]),
            PATCH: true
          })
          this.checkLocation()
          this.checkType_Of_Business();
        } else {
          this.setState({ PATCH: false })
          return
        }
      })
  }

  checkLocation() {
    if (this.state.organization.Location.includes('city', 'state')) {
      this.setState({
        city: true
      
      })
    } else if (this.state.organization.type_of_business.includes('type')) {
      this.setState({
        type: true

      })
    }
  }


  componentWillMount() {
    this.checkDatabase()
  }

  render() {
    return (
      <div>
        <h2>Create organization Profile</h2>
        {this.errorMessage()}
        <form
          id="create-profile-form"
          onSubmit={event => {
            this.EditOrganization(event);
          }}
        >
          <label>
            Name*
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={this.state.organization.name}
              onChange={event => this.updateProperty(event)}
              required
            />
          </label>
          <label>
            Location
            <input
              id="location"
              type="text"
              name="location"
              placeholder="City, State"
              value={this.state.organization.location}
              onChange={event => this.updateProperty(event)}
            />
          </label>
          <label>
            Type of business
            <textarea
              id="name"
              type="textarea"
              name="type_of_business"
              placeholder="Interests, spevialties, scope, etc"
              value={this.state.organization.type_of_business}
              onChange={event => this.updateProperty(event)}
            />
            
          </label>
          <input
            type="submit"
            value="SUBMIT"
          />
        </form>
      </div>
    )
  }
}