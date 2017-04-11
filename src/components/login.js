import React from 'react';
import Auth from '../services/auth_service';

class Login extends React.Component {

  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
      status: ''
    };
  }

  login = (event) => {
    event.preventDefault();
    Auth.login(this.state.email, this.state.password)
      .then(() => {
        this.setState(function(prevState, props){
          return {status: "Login Succesful. Redirecting.."}
        });
      })
      .catch((err) => {
        this.setState(function(prevState, props){
          return {status: "Error"}
        });
      });
  }

  handleEmail = (event) => {
    const value = event.target.value;
    this.setState(function(prevState, props){
      return {email: value};
    });
  }

  handlePass = (event) => {
    const value = event.target.value;
    this.setState(function(prevState, props){
      return {password: value};
    });
  }

  render() {
    return (
      <div>
        <h1>Login</h1>
        <p>{this.state.status}</p>
        <form>
        <div>
          <label htmlFor="username">Username</label>
          <input type="email" value={this.state.email} className="form-control" name="email" placeholder="Email" onChange={this.handleEmail()} required="required"/>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" value={this.state.password} className="form-control" name="password" placeholder="Password" onChange={this.handlePass()} required="required" />
        </div>
        <button type="submit" className="btn btn-default" onClick={this.login.bind(this)}>Submit</button>
      </form>
    </div>
    );
  }
}

export default Login;
