import React, { Component } from 'react';
import { Route } from 'react-router';
import  FindOrganization  from './FindOrganization';
import OrganizationCard from './OrganizationCard';
import { Link } from 'react-router-dom';
import axios from 'axios';

class StudentHome extends Component {
  constructor(props) {
    super(props);


    this.state = {
      name: '',
      school: '',
      year: '',
      major: '',
      email: '',
      interests: '',

      students: {
        id: 0,
        student_name: '',
        student_school: '',
        year: '',
        major: '',
        email: '',
        interests: '',
        stud_id: 0
      }
    }
  this.handleInput = this.handleInput.bind(this);
  this.onSubmit = this.onSubmit.bind(this);

  }

  // componentDidMount() {
  //   axios.get
  // }

  handleInput(event) {
    this.setState({[event.target.name]: event.target.value})
  }

  onSubmit(event) { 
    axios.post('/api/student', {
      student_name: this.state.name,
      student_school: this.state.school,
      year: this.state.year,
      major: this.state.major,
      email: this.state.email,
      interests: this.state.interests,
      

    })
    .then((response) => {
      console.log(response.data);
      this.setState({students:response.data[0]})
      this.props.history.push('/StudentHome')
    
    }).catch(console.log)


  
    event.target.value
  }

  render() {
    return (
      <form className="form-container">
        <div>
          name<input name="nameInput" onChange={(event) => this.handleInput(event)} type="text" value={this.state.nameInput} />
          school<input name="schoolInput" onChange={(event) => this.handleInput(event)} type="text" value={this.state.schoolInput} />
        </div><br/>
        <div>
          year<input name="yearInput" onChange={(event) => this.handleInput(event)} type="text" value={this.state.yearInput} />< br />
        </div>
        <div>
          major<input name="majorInput" onChange={(event) => this.handleInput(event)} type="text" value={this.state.majorInput} />< br />
        </div>
        <div>
          email<input name="emailInput" onChange={(event) => this.handleInput(event)} type="text" value={this.state.emailInput} />< br />
        </div>
        <div>
          interests<textarea name="interestsInput" onChange={(event) => this.handleInput(event)} type="text" value={this.state.interestsInput} />< br />
        </div>

        <button className="add-student" onClick={() => this.onSubmit() }>Submit</button>

      </form>
    );
  }
}

export default StudentHome;


// StudentHome = (props) => {
//   const { user } = props;

//   const generateOrganizations = () => {
//     if (!props.matchingOrganizations.length) {
//       return props.organizations.map( organization => {
//         return (
//           <OrganizationCard organization={organization} key={organization.id} />
//         )
//       });
//     } else {
//       return props.matchingOrganizations.map( organization => {
//         return (
//           <OrganizationCard organization={organization} key={organization.id} />
//         )
//       });
//     }
//   };

//   return (
//     <div className='student-home-container' >
//       <h2>Student Home</h2>
//       <img src={props.user.avatar_url} id='user-image' />
//       <Link
//         to='/edit-student'
//         className='student-edit-link'>
//         EDIT PROFILE
//       </Link>
//       <FindOrganization
//         matchingOrganizations={props.matchingOrganizations}
//         getFilteredOrganizations={props.getFilteredOrga}
//         organizations={props.organizations} />
//       <div className='sh-organization-container' >
//         {generateOrganizations()}
//       </div>

//     </div>
//   )
// }

// export default StudentHome;







        