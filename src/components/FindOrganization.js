import React, { Component } from 'react';
import { Route } from 'react-router';

export default class FindOrganizations extends Component {
  constructor(props) {
    super(props)
    this.allOrganizations = props.organizations;
    this.state = {
      searchParams: {
        location: '',
        type_of_business: '',       
        
      }
    }
    this.setSelectedKeys = this.setSelectedKeys.bind(this);
    this.filterOrganizations = this.filterOrganizations.bind(this);
  }

  setSelectedKeys(searchParams) {

    let queries = Object.keys(searchParams).filter( param => {
      return searchParams[param];
    });
    return queries;
  }

  filterOrganizations(selectedKeys, searchParams) {
    const targetOrganizations = [];

    this.allOrganizations.forEach( organization => {
      let pushing = 0;

      selectedKeys.forEach( key => {
        if (organization[key].toLowerCase().includes(searchParams[key].toLowerCase())) {
          pushing += 1;
        }
        if (pushing === selectedKeys.length) {
          targetOrganizations.push(organization);
        }
      });
    });
    return targetOrganizations;
  }

  updateProperty(e) {
    const { name, value } = e.target;

    this.setState({
      searchParams: Object.assign(this.state.searchParams, {
        [name]: value
      })
    });
  }

  render() {
    const { getFilteredOrganizations } = this.props;
    let { searchParams } = this.state;

    return (
      <div>
        <h2>Search for an Organization</h2>
        <form
          onSubmit={e => getFilteredOrganizations(e, searchParams, this.setSelectedKeys, this.getFilteredOrganizations )}>
          <label> Location
            <input
              type='text'
              name='location'
              placeholder='New York, NY'
              value={this.state.searchParams.preferred_name}
              onChange={e => this.updateProperty(e)}
            />
          </label>
          <label> Type of Business
            <input
              type='text'
              name='type_of_business'
              placeholder='research'
              value={this.state.searchParams.location}
              onChange={e => this.updateProperty(e)}
            />

          </label>
          <input
            className='buttons'
            type="submit"
            value="Filter Organizations"
          />
        </form>

      </div>
    )
  }
}
