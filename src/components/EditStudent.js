import React, { Component } from 'react';
import { Route } from 'react-router';

export default class EditStudent extends Component {
  constructor(props) {
    super(props)

    this.state = {
      student: {
        preferred_name: '',
        slack: '',
        email: '',
        stack_interests: '',
        gh_id: this.props.user.ghId,
        avatar_url: this.props.user.avatar_url,
        program_id: 1
      },
      errorStatus: '',
      PATCH: false
    }
  }

  updateProperty(event) {
    const { name, value } = event.target;

    this.setState({
      student: Object.assign(this.state.student, {
        [name]: value
      })
    })
  }

  editStudent(event) {
    event.preventDefault();
    const student = this.state.student;

    if (this.state.PATCH) {
      fetch(`/api/v1/students/${student.gh_id}`, {
        method: 'PATCH',
        body: JSON.stringify(student),
        headers: {
          'CONTENT-TYPE': 'application/json'
        }
      })
      .then(() => this.props.history.replace('/student-profile'))
      .catch(error => {
        this.setState({
          errorStatus: 'Error creating profile; please make sure the form is accurately filled out'
        })
      })
    } else {
      fetch('/api/v1/students', {
        method: 'POST',
        body: JSON.stringify(student),
        headers: {
          'CONTENT-TYPE': 'application/json'
        }
      })
      .then(() => this.props.history.replace('/student-profile'))
      .catch(error => {
        this.setState({
          errorStatus: 'Error creating profile; please make sure the form is accurately filled out'
        })
      })
    }
  }

  checkDatabase() {
    const { ghId } = this.props.user;

    fetch(`/api/v1/students/${ghId}`)
      .then(response => response.json())
      .then(student => {
        if (student.length === 1) {
          this.setState({
            student: Object.assign(this.state.student, student[0]),
            PATCH: true
          })
        } else {
          this.setState({ PATCH: false })
          return
        }
      })
  }

  componentWillMount() {
    this.checkDatabase()
  }

  render() {
    return (
      <div>
        <h2>Create a Student</h2>
        <form
          onSubmit={event => this.editStudent(event)}
        >
          <label>
            Preferred Name
            <input
              type="text"
              name="preferred_name"
              placeholder="Preferred Name"
              value={this.state.student.preferred_name}
              onChange={event => this.updateProperty(event)}
              required
            />
          </label>
          <label>
            Cohort
            <select
              name='program_id'
              onChange={event => this.updateProperty(event)}
              required
            >
              <option value='1'>Front End Mod 1</option>
              <option value='2'>Front End Mod 2</option>
              <option value='3'>Front End Mod 3</option>
              <option value='4'>Front End Mod 4</option>
              <option value='5'>Back End Mod 1</option>
              <option value='6'>Back End Mod 2</option>
              <option value='7'>Back End Mod 3</option>
              <option value='8'>Back End Mod 4</option>
            </select>
          </label>
          <label>
            Slack Handle
            <input
              id="profile-slack"
              type="text"
              name="slack"
              placeholder="Slack Handle"
              value={this.state.student.slack}
              onChange={event => this.updateProperty(event)}
              required
            />
          </label>
          <label>
            Email Address
            <input
              id="profile-email"
              type="email"
              name="email"
              placeholder="email@youremail.com"
              value={this.state.student.email}
              onChange={event => this.updateProperty(event)}
            />
          </label>
          <label>
            Stack Interests
            <input
              type="text"
              name="stack_interests"
              placeholder="Stack Interests"
              value={this.state.student.stack_interests}
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
