var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');
var UserStore = new Store(AppDispatcher);

var _currentUser, _authErrors;

UserStore.__onDispatch = function(payload) {
  switch(payload.actionType) {
    case "LOGIN":
      UserStore.login(payload.user);
      break;
    case "LOGOUT":
      UserStore.logout(payload.user);
      break;
    case "ERROR":
      UserStore.setErrors(payload.errors);
      break;
  }
  UserStore.__emitChange();
};

UserStore.login = function(user) {
  _currentUser = user;
  _authErrors = null;
};

UserStore.logout = function() {
  _currentUser = null;
  _authErrors = null;
};

UserStore.currentUser = function() {
  if (_currentUser) {
    return $.extend({}, _currentUser);
  }
};

UserStore.setErrors = function(errors) {
  _authErrors = errors;
};

UserStore.errors = function() {
  if (_authErrors) {
    // return [].slice.call(_authErrors);
    return JSON.parse(_authErrors.responseText);
  }
};

module.exports = UserStore;
