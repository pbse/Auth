// EnsureLoggedInContainer.js
import React from 'react';
import {browserHistory} from 'react-router';
import UserStore from '../stores/UserStore';
import { loginUser } from '../actions/LoginActions';

class EnsureLoggedInContainer extends React.Component {

    /** Constructor  
     */
    constructor(props) {
      super(props)
      this.state = this.getCurrentState();
    }

    /** Get Current State
     * @return UserLoggedIn
     */  
    getCurrentState() {
      return {
        userLoggedIn: UserStore.isLoggedIn()
      };
    }

    componentDidMount() {  
      if (!this.state.userLoggedIn) {
        browserHistory.push("/user/login")
      }
    }

    /** Render passes the props
     * to any component which calls it.
     */
    render() {
      return this.props.children
  }
}

export default EnsureLoggedInContainer;