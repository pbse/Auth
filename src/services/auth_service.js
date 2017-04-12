// auth_service.js
import request from 'request';
import { loginUser, logoutUser } from '../actions/UserActions';

class AuthService {

  login(email, password) {
    const options = {
      url: 'http://localhost:9000/user/login',
      method: 'POST',
      body: JSON.stringify({
        "email": email,
        "password": password
      })
    };
    return new Promise((resolve, reject) => {
      request(options, (error, response, body) => {
        if (!error && response.statusCode >= 200 && response.statusCode <= 304) {
          body = JSON.parse(body);
          if (body.access_granted)
            resolve(loginUser(body.token));
          else reject("Email/Pass in Invalid");
        } else reject("Email/Pass in Invalid");

      })
    });
  }

  logout() {
    const options = {
      url: 'http://localhost:9000/user/logout',
      method: 'POST',
    };
    return new Promise((resolve, reject) => {
      request(options, (error, response, body) => {
        if (response.statusCode >= 200 && response.statusCode <= 304) {
          resolve(logoutUser());
        }
      });
    });
  }
}

export default new AuthService();