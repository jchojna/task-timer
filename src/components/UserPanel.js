import React, { Component } from 'react';
import classNames from 'classnames';
import UserForm from './UserForm';
import '../scss/UserPanel.scss';

class UserPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isUserPanelLoaded: false,
      isLoginFormVisible: false,
      isSignupFormVisible: false,
      signInLogin: '',
      signInPassword: '',
      signUpLogin: '',
      signUpPassword: ''
    };
  }

  componentDidMount() {
    this.setState({
      isUserPanelLoaded: true,
      isLoginFormVisible: true
    });
  }

  handleInputChange = ({target}, type) => {
    this.setState({ [`${type}Login`] : target.value });
  }

  handleCardToggle = () => {
    this.setState(prevState => ({
      isLoginFormVisible: !prevState.isLoginFormVisible,
      isSignupFormVisible: !prevState.isSignupFormVisible,
      isFirstLoad: false
    }));
  }

  handleLoginForm = (login, password) => {
    console.log('log in', login, password);
  }

  handleSignupForm = (login, password) => {
    console.log('sign up', login, password);
  }

  render() {
    const {
      isUserPanelLoaded,
      isLoginFormVisible,
      isSignupFormVisible } = this.state;

    const userPanelClass = classNames('UserPanel', {
      'UserPanel--visible': isUserPanelLoaded
    });

    const loginClass = classNames('loginForm', {
      'loginForm--rotateIn': isLoginFormVisible,
      'loginForm--rotateOut': !isLoginFormVisible
    });
    const signupClass = classNames('signupForm', {
      'signupForm--rotateIn': isSignupFormVisible,
      'signupForm--rotateOut': !isSignupFormVisible
    });

    return (
      <div className={userPanelClass}>
        <p className="UserPanel__logo">
          task<span className="UserPanel__logo--color">Timer</span>
        </p>
        <div className="UserPanel__container">
          <UserForm
            className={loginClass}
            id="loginForm"
            title="Log In"
            loginButtonName="Log In"
            onLoginButtonClick={this.handleLoginForm}
            onSignupButtonClick={this.handleCardToggle}
          />

          <UserForm
            className={signupClass}
            id="signupForm"
            title="Sign Up"
            loginButtonName="Cancel"
            onLoginButtonClick={this.handleCardToggle}
            onSignupButtonClick={this.handleSignupForm}
          />
        </div>
      </div>
    );
  }
}
export default UserPanel;