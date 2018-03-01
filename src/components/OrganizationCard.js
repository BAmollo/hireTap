import React, { Component } from 'react';

export default class OrganizationCard extends Component  {
  constructor(props) {
    super(props);
    this.state = {
      showMore: false
    };
    this.toggleView = this.toggleView.bind(this);
  }

  toggleView() {
    let view = !this.state.showMore;

    this.setState({
      showMore: view
    });
  }

  render() {
    const { preferred_name, bio, avatar_url, availability, company, dev_type, email, slack, location, phone, pairing_location, position, preferred_contact, stack, ghId } = this.props.mentor;
    let view = this.state.showMore ? 'Show Less' : 'Show More';

    if(!this.state.showMore) {
      return (
        <div className='mc-wrapper' >
          <h3 className='mc-dev-type' >{dev_type}</h3>
          <h2 className='mc-name' >{preferred_name}</h2>
          <img className='mc-img' src={avatar_url} />
          <h3 className='mc-location' >{location}</h3>
          <div className='mc-bottom-container'>
            <h3 className='mc-h3' >Bio:
              <p className='mc-details' >{bio}</p>
            </h3>
            <h3 className='mc-h3' >Availability:
              <p className='mc-details' >{availability}</p>
            </h3>
            <h3 className='mc-h3' >Stack:
              <p className='mc-details' >{stack}</p>
            </h3>
            <h3 className='mc-h3' >Pairing Location:
              <p className='mc-details' >{pairing_location}</p>
            </h3>
          </div>

          <button
            className='toggle-view-btn'
            onClick={this.toggleView}> {view} </button>
        </div>
      )
    } else {
      return (
        <div className='mc-wrapper' >
          <h3 className='mc-dev-type' >{dev_type}</h3>
          <h2 className='mc-name' >{preferred_name}</h2>
          <img className='mc-img' src={avatar_url} />
          <h3 className='mc-location' >{location}</h3>
          <div className='mc-bottom-container'>
            <h3 className='mc-h3' >Bio:
              <p className='mc-details' >{bio}</p>
            </h3>
            <h3 className='mc-h3' >Availability:
              <p className='mc-details' >{availability}</p>
            </h3>
            <h3 className='mc-h3' >Stack:
              <p className='mc-details' >{stack}</p>
            </h3>
            <h3 className='mc-h3' >Pairing Location:
              <p className='mc-details' >{pairing_location}</p>
            </h3>
            <h3 className='mc-h3' >Company:
              <p className='mc-h3' >{company}</p>
            </h3>
            <h3 className='mc-h3' >Position:
              <p className='mc-h3' >{position}</p>
            </h3>
            <h3 className='mc-h3' >Contact:
              <p className='mc-h3' >Preferred Form of Contact: {preferred_contact}</p>
              <p className='mc-h3' >Slack: {slack}</p>
              <p className='mc-h3' >Email: {email}</p>
              <p className='mc-h3' >Phone: {phone}</p>
            </h3>
          </div>

          <button
            className='toggle-view-btn'
            onClick={this.toggleView}> {view} </button>
        </div>
      )
    }
  }
}