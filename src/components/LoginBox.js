import React, { Component } from 'react';
import '../scss/LoginBox.scss';

class LoginBox extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <section className="LoginBox">
        <p className="LoginBox__logo">
          task<span className="LoginBox__logo--color">Timer</span>
        </p>
        <div className="LoginBox__container">
          <h2 className="LoginBox__heading">Log In</h2>
          <label
            htmlFor="login"
            className="LoginBox__label LoginBox__label--login"
          >
            Login:
          </label>
          <input
            id="login"
            type="text"
            className="LoginBox__input LoginBox__input--login"
            spellCheck="false"
          />
          <label
            htmlFor="password"
            className="LoginBox__label LoginBox__label--password"
          >
            Password:
          </label>
          <input
            id="password"
            type="password"
            className="LoginBox__input LoginBox__input--password"
            spellCheck="false"
          />
          <button className="LoginBox__button LoginBox__button--logIn">
            Log In
          </button>
          <button className="LoginBox__button LoginBox__button--signUp">
            Sign Up
          </button>
        </div>
      </section>
    );
  }
}
export default LoginBox;