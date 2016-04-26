var React = require('react');
var UserActions = require("../actions/user_actions");
var CurrentUserState = require("../mixins/current_user_state");
var UserStore = require("../stores/user_store");
var LoginForm = React.createClass({

  getInitialState: function() {
    return {form: "login"};
  },

  __onChange: function() {
    this.setState({currentUser: UserStore.currentUser(),
                    userErrors: UserStore.errors()});
  },

  componentDidMount: function() {
    UserStore.addListener(this.__onChange);
  },

  setForm: function(e) {
    this.setState({form: e.currentTarget.value});
  },

  handleSubmit: function(e) {
    e.preventDefault();
    UserActions[this.state.form]({
      username: this.state.username,
      password: this.state.password
    });
    this.setState({
      username: null,
      password: null
    });
  },

  logout: function(e) {
    e.preventDefault();
    UserActions.logout();
  },

  errors: function() {
    if (!this.state.userErrors) {
      return;
    }
    return (
      <ul>
        {
          this.state.userErrors.errors.map(function(error, idx) {
            return (<li key={idx}>{error}</li>);
          })
        }
      </ul>
    );
  },

  updateUsername: function(event) {
    this.setState({username: event.target.value});
  },

  updatePassword: function(event) {
    this.setState({password: event.target.value});
  },

  greeting: function() {
    if (!this.state.currentUser) {
      return ;
    }
    return (
      <div>
        <h2>Hi, {this.state.currentUser.username}</h2>
        <input type="submit" value="logout" onClick={this.logout}/>
      </div>
    );
  },

  form: function() {
    if (this.state.currentUser) {
      return ;
    }
    return (
      <form onSubmit={this.handleSubmit}>
        <section>
          <label> Username:
            <input type="text" value={this.state.username} onChange={this.updateUsername}/>
          </label>
          <label> Password:
            <input type="password" value={this.state.password} onChange={this.updatePassword}/>
          </label>
        </section>

        <section>
          <label> Login
            <input type="Radio" name="action" value="login" onChange={this.setForm}/>
          </label>
          <label> Sign up
            <input type="Radio" name="action" value="signup" onChange={this.setForm}/>
          </label>
        </section>

        <input type="Submit"/>
      </form>
    );
  },

  render: function() {
    return (
      <div id="login-form">
        {this.greeting()}
        {this.errors()}
        {this.form()}
      </div>
    );
  }
});

module.exports = LoginForm;
