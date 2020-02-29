import React, { Component } from 'react';
import classNames from 'classnames';
import '../scss/LoginBox.scss';

class LoginBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoginBoxLoaded: false,
      isSignInVisible: false,
      isSignUpVisible: false
    };
  }

  componentDidMount() {
    this.setState({
      isLoginBoxLoaded: true,
      isSignInVisible: true
    });
  }

  handleCardToggle = () => {
    this.setState(prevState => ({
      isSignInVisible: !prevState.isSignInVisible,
      isSignUpVisible: !prevState.isSignUpVisible,
      isFirstLoad: false
    }));
  }

  handleLogIn = () => {
    console.log('log in');
  }

  handleSignUp = () => {
    console.log('sign up');
  }

  render() {
    const {
      isLoginBoxLoaded,
      isSignInVisible,
      isSignUpVisible} = this.state;

    const loginBoxClass = classNames('LoginBox', {
      'LoginBox--visible': isLoginBoxLoaded
    });

    const signInClass = classNames('signIn', {
      //'signIn--visible': isSignInVisible,
      'signIn--rotateIn': isSignInVisible,
      'signIn--rotateOut': !isSignInVisible
    });
    const signUpClass = classNames('signUp', {
      //'signUp--visible': isSignUpVisible,
      'signUp--rotateIn': isSignUpVisible,
      'signUp--rotateOut': !isSignUpVisible
    });

    return (
      <div className={loginBoxClass}>
        <p className="LoginBox__logo">
          task<span className="LoginBox__logo--color">Timer</span>
        </p>
        {/* SIGN IN */}
        <div className="LoginBox__container">
          <section className={signInClass}>
            <h2 className="signIn__heading">Log In</h2>
            <label
              htmlFor="signInLogin"
              className="signIn__label signIn__label--login"
            >
              Login:
            </label>
            <input
              id="signInLogin"
              type="text"
              className="signIn__input signIn__input--login"
              spellCheck="false"
            />
            <label
              htmlFor="signInPassword"
              className="signIn__label signIn__label--password"
            >
              Password:
            </label>
            <input
              id="signInPassword"
              type="password"
              className="signIn__input signIn__input--password"
              spellCheck="false"
            />
            <button
              className="signIn__button signIn__button--logIn"
              onClick={this.handleLogIn}
            >
              Log In
            </button>
            <button
              className="signIn__button signIn__button--signUp"
              onClick={this.handleCardToggle}
            >
              Sign Up
            </button>
          </section>

          {/* SIGN UP */}
          <section className={signUpClass}>
            <h2 className="signUp__heading">Sign Up</h2>
            <label
              htmlFor="signUpLogin"
              className="signUp__label signUp__label--login"
            >
              Login:
            </label>
            <input
              id="signUpLogin"
              type="text"
              className="signUp__input signUp__input--login"
              spellCheck="false"
            />
            <label
              htmlFor="signUpPassword"
              className="signUp__label signUp__label--password"
            >
              Password:
            </label>
            <input
              id="signUpPassword"
              type="password"
              className="signUp__input signUp__input--password"
              spellCheck="false"
            />
            <button
              className="signUp__button signUp__button--logIn"
              onClick={this.handleCardToggle}
            >
              Cancel
            </button>
            <button
              className="signUp__button signUp__button--signUp"
              onClick={this.handleSignUp}
            >
              Sign Up
            </button>
          </section>
        </div>
      </div>
    );
  }
}
export default LoginBox;