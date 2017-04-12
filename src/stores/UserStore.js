import jwt from 'jwt-decode';
import Dispatcher from '../dispatcher/Dispatcher';
import { EventEmitter } from 'events';

class UserStoreClass extends EventEmitter {

  /** UserStore Constructor
   * Create token, userObject, and boolean for user's login status
   * Registers the Dispatcher on Load
   */

  constructor() {
    super();
    this.token = null;
    this.user = null;
    this.isLoggedIn = false;
    Dispatcher.register(this.actionDispatcher.bind(this));
  }

  addChangeListener(callback) {
    this.on('change', callback);
  }

  removeChangeListener(callback) {
    this.removeListener('change', callback);
  }

  get getToken() {
    return this.token;
  }

  get getUser() {
    return this.user;
  }

  get isLoggedIn() {
    return this.isLoggedIn;
  }

  emitChange() {
    this.emit('change');
  }

  actionDispatcher(payload) {
    switch (payload.action.type) {

      case 'LOGIN_USER':
        const token = payload.action.data;
        this.token = token;
        this.user = jwt(token).user;
        this.isLoggedIn = true;
        this.emitChange();
        break;
        
      case 'LOGOUT_USER':
        this.token = null;
        this.isLoggedIn = false;
        this.user = null;
        this.emitChange();
        break;

      default:
        break;
    }

  }

};

export default new UserStoreClass();