import React, { Component } from 'react';
import  Header from './Header.js';
import { Callback } from './Callback.js';
import  StudentHome  from './StudentHome';
import OrganizationHome from './OrganizationHome.js';
import { ChooseStatus } from './ChooseStatus.js';
import EditOrganization from './EditOrganization';
import { Route, Link, Switch, BrowserRouter } from 'react-router-dom';
import EditStudent from './EditStudent';
import OrganizationCard from './OrganizationCard';
//import response from ('./response');
import {filterOrganizations} from '../redux/actionCreators';
import background from '../images/background.jpg';
import logo from '../images/logo.png';
import {getUser} from './reducers';
import {connect} from 'react-redux';
import routes from './routes';
// import { Link } from 'react-router-dom';


 class App extends Component {
  constructor() {
    super();
    this.state = {
      githubAuthCode: undefined,
      user: undefined,
      matchingOrganizations: [],
      currentOrganization: {},
      firstMentor: undefined,
      organizations:[],
    };
    this.organization = [];
    this.updateOrganization = this.updateOrganization.bind(this);
    this.setUser = this.setUser.bind(this);
    this.getFilteredOrganizations = this.getFilteredOrganizations.bind(this);
    this.clearState = this.clearState.bind(this);
    this.setCurrentOrganization = this.setCurrentOrganization.bind(this);
  }

  clearState() {
    this.props.history.replace('/');
    this.setState({
      githubAuthCode: undefined,
      user: undefined,
      matchingOrganizations: [],
      currentOrganization: {}
    });
  }

  setAppState() {
    const codeParam = this.props.location.search;
    const githubAuthCode = codeParam.split("=")[1];

    if (!this.state.githubAuthCode) {
      this.setState({
        githubAuthCode
      });
    } else {
      this.setState({
        githubAuthCode: undefined
      });
    }
  }

  setCurrentOrganization(currentOrganization) {
    this.setState({
      currentOrganization
    });
    this.props.history.replace('/organization-profile');
  }

  getAllOrganizations() {
    fetch('/api/v1/organizations')
      .then(response => response.json())
      .then(data => {
        // this.organizations = data;
        this.setState({
          organizations:data,
          firstOrganization: data[0]
        })
      })
      .catch(error => {
        console.log(error);
      });
  }

  componentDidMount() {
    this.setAppState();
    this.getAllOrganizations();
    this.props.getUser();
  }

  updateOrganization(organizations) {
    this.setState({ organizations: [organizations]});
  }

  setUser(user) {
    this.setState({ user });
  }

  getFilteredOrganizations(e, searchParams, setSelectedKeys, filterMentors) {
    e.preventDefault();

    let selectedKeys = setSelectedKeys(searchParams);

    const searchedOrganizations = filterOrganizations(selectedKeys, searchParams);

    this.setState({
      matchingOrganizations: searchedOrganizations
    });
  }

  showSingleOrganization(organization) {
    if (this.props.location.pathname === '/'  && organization) {
      return (
        <div>
          <p className='login-prompt' >*LOGIN TO SEE MORE ORGANIZATIONS*</p>
          <OrganizationCard organization ={organization} />
        </div>
      )
    }
    return (
      <div></div>
    )
  }

  render() {
    const { user, matchingOrganizations, Organization } = this.state;
    const { history } = this.props;
    
    return (
      <div className='App'> 
      
      <break/>
        <Header
          user={user}
          clearState={this.clearState} />
        <Switch>
          <Route path="/callback" render={(props) => <Callback
              className='callback-'
              setUser={this.setUser}
              user={user}
              history={history}
              /> }/>

          <Route path='/student-profile' render={(props) => <StudentHome
            className='student-home-'
            user={user}
            organizations={this.organization}
            matchingOrganization={matchingOrganizations}
            getFilteredOrganizations={this.getFilteredOrganizations} />}/>
          <Route path='/organization-profile' render={(props) => <OrganizationHome className='organization-home-' user={user} Organization={Organization}/>}/>
          <Route path='/choose-status' render={(props) => <ChooseStatus className='choose-status-' user={user} />}/>
          <Route path='/edit-student' render={(props) => <EditStudent className='edit-student-' user={user} history={history} />}/>
          <Route path='/edit-organization' render={(props) => <EditOrganization className='edit-organization-' user={user} updateOrganizations={this.updateOrganizations} history={history} setOrganization={this.setOrganization}/>}/>
         
          <div>  
            <img src={ background } className="background" alt="background" />
         </div>


        </Switch>
   
        {this.showSingleOrganization(this.state.organizations[0])}


        { routes }
        <StudentHome />
      </div>
    )
  }
}

export default connect(null, {getUser})(App);