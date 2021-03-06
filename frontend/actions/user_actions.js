var AppDispatcher = require('../dispatcher/dispatcher');
var UserConstants = require('../constants/user_constants');
var UserStore = require('../stores/user_store');
var UserApiUtil = require('../util/user_api_util');

var UserActions = {
  fetchCurrentUser: function() {
    UserApiUtil.fetchCurrentUser(UserActions.receiveCurrentUser,
                                 UserActions.handleError);
  },

  signup: function(user) {
    UserApiUtil.post({
      url: "/api/user",
      user: user,
      success: UserActions.receiveCurrentUser,
      error: UserActions.handleError
    });
  },

  login: function(user) {
    UserApiUtil.post({
      url: "/api/session",
      user: user,
      success: UserActions.receiveCurrentUser,
      error: UserActions.handleError
    });
  },

  guestLogin: function() {
    UserActions.login({username: "guest", password: "password"});
  },

  receiveCurrentUser: function(user) {
    AppDispatcher.dispatch({
      actionType: UserConstants.LOGIN,
      user: user
    });
  },

  handleError: function(response) {
    AppDispatcher.dispatch({
      actionType: UserConstants.ERROR,
      errors: response.error()
    });
  },

  removeCurrentUser: function() {
    AppDispatcher.dispatch({
      actionType: UserConstants.LOGOUT
    });
  },

  logout: function() {
    UserApiUtil.logout(UserActions.removeCurrentUser, UserActions.handleError);
  }

};

module.exports = UserActions;
