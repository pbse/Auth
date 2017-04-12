import request from 'request';
import { loginUser, logoutUser } from '../actions/UserActions';
import UserStore from '../stores/UserStore';

class AuthService {

  login(email, password) {
    const options = {
      method: 'POST',
      body: JSON.stringify({
        "email": email,
        "password": password
      })
    };
    return request("http://localhost:3000/user/login", options)
      .then(response => {
        if (response.access_granted) {
          loginUser(response.token);
        } else throw "Email/Pass is Invalid";
      })
  }

  logout() {
    const options = {
      method: 'POST',
    };
    return request("http://localhost:3000/user/logout", options)
      .then(response => {
        logoutUser();
      })
  }
}

export default new AuthService();