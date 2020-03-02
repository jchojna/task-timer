import React, { Component } from 'react';
//import classNames from 'classnames';
import UserInput from './UserInput';
import '../scss/UserForm.scss';

class UserForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: '',
      password: '',
      confirm: '',
      isLoginInputValid: false,
      isPasswordInputValid: false,
      isConfirmPasswordValid: false,
      isLoginAlertVisible: false,
      isPasswordAlertVisible: false,
      isConfirmAlertVisible: false,
      loginAlertText: '',
      passwordAlertText: '',
      confirmAlertText: '',
      isConfirmPasswordDisabled: true
    }
  }

  handleStateChange = (object) => this.setState(object);

  handleCardToggle = () => {
    const { onCardToggle } = this.props;
    onCardToggle();
    this.setState({
      login: '',
      password: '',
      confirm: '',
      isLoginAlertVisible: false,
      isPasswordAlertVisible: false,
      isConfirmAlertVisible: false,
    });
  }

  handleInputChange = (input, value) => {
    const inputName = input.charAt(0).toUpperCase() + input.substring(1);
    input === 'password'
    ? this.setState({
        password: value,
        isPasswordAlertVisible: false,
        confirm: '',
        isConfirmAlertVisible: false
      })
    : this.setState({
      [input]: value,
      [`is${inputName}AlertVisible`]: false
    });
  }

  handleLoginValidation = () => {
    const { block, users } = this.props;
    const { login } = this.state;
    const logins = [...users].map(user => user.login);

    const isEmpty = login === '';
    const hasLoginWhiteSpaces = /\s/g.test(login);
    const doesLoginExist = [...logins].filter(l => l === login).length > 0;
    const isLoginIncorrect = block === 'loginForm' && !doesLoginExist;
    const isNewLoginIncorrect = block === 'signupForm' && doesLoginExist;

    // handle alert text
    const loginAlertText = isEmpty ? 'Please enter your login' :
    hasLoginWhiteSpaces ? 'Login cannot contain any spaces' :
    isLoginIncorrect ? 'There is no user with this login' :
    isNewLoginIncorrect ? 'This login already exist. Try another one' : '';

    const isInvalid = isEmpty
    || hasLoginWhiteSpaces
    || isLoginIncorrect
    || isNewLoginIncorrect;

    if (isInvalid) {
      this.setState({
        isLoginInputValid: false,
        isLoginAlertVisible: true,
        loginAlertText
      });
      return false;

    } else {
      this.setState({
        isLoginInputValid: true,
        isLoginAlertVisible: false
      });
      return true;
    }
  }

  handlePasswordValidation = () => {
    const { block } = this.props;
    const { password } = this.state;

    let passwordAlertText = '';
    const isEmpty = password === '';
    const isPasswordTooShort = password.length < 6;
    const hasPasswordWhiteSpaces = /\s/g.test(password);
    
    switch (block) {

      case 'loginForm':
        
        if (isEmpty) {
          passwordAlertText = 'Please enter your password';
          this.setState({
            isPasswordInputValid: false,
            isPasswordAlertVisible: true,
            isConfirmPasswordDisabled: true,
            passwordAlertText
          });
          return false;
        }

        this.setState({
          isPasswordInputValid: true,
          isPasswordAlertVisible: false,
          isConfirmPasswordDisabled: false
        });
        return true;

      case 'signupForm':
            
        if (isEmpty || isPasswordTooShort || hasPasswordWhiteSpaces) {
          passwordAlertText = isEmpty
          ? 'Please enter your password'

          : isPasswordTooShort
          ? 'Password should have at least 6 signs'

          : hasPasswordWhiteSpaces
          ? 'Password cannot contain any spaces'
          : 'Other reasons...';

          this.setState({
            isPasswordInputValid: false,
            isPasswordAlertVisible: true,
            isConfirmPasswordDisabled: true,
            passwordAlertText
          });
          return false;
        }

        this.setState({
          isPasswordInputValid: true,
          isPasswordAlertVisible: false,
          isConfirmPasswordDisabled: false
        });
        return true;
        
      default: break;
    }
  }

  handleConfirmValidation = () => {
    const { password, confirm } = this.state;

    let confirmAlertText = '';
    const isEmpty = confirm === '';
    const doPasswordsMatch = password === confirm;
        
    if (isEmpty || !doPasswordsMatch) {
      confirmAlertText = isEmpty
      ? 'Please confirm your password'

      : !doPasswordsMatch
      ? 'Passwords do not match'
      : 'Other reasons...';

      this.setState({
        isConfirmPasswordValid: false,
        isConfirmAlertVisible: true,
        confirmAlertText
      });
      return false;
    }

    this.setState({
      isConfirmPasswordValid: true,
      isConfirmAlertVisible: false
    });
    return true;
  }

  handleFormSubmit = (e) => {
    e.preventDefault();

    const { block, onUsersChange } = this.props;
    const {
      isLoginInputValid,
      isPasswordInputValid,
      isConfirmPasswordValid,
      login,
      password
    } = this.state;
    
    if (block === 'loginForm') {

      if (isLoginInputValid && isPasswordInputValid) {
        console.log('logged in');
      } else {
        console.log('log in failed');
      }

    } else if (block === 'signupForm') {

      if (isLoginInputValid && isPasswordInputValid && isConfirmPasswordValid) {
        console.log('created new user');
      } else {
        console.log('cannot create new user');
      }

      const newUser = {
        login: login,
        password: password
      }
      onUsersChange(newUser);      
    }
  }

  render() {

    const {
      className,
      block
    } = this.props;

    const {
      login,
      password,
      confirm,
      isLoginAlertVisible,
      isPasswordAlertVisible,
      isConfirmAlertVisible,
      loginAlertText,
      passwordAlertText,
      confirmAlertText,
      isConfirmPasswordDisabled
    } = this.state;

    const isLoginForm = block === 'loginForm';
    const title = isLoginForm ? 'Log In' : 'Sign Up';
    const loginButtonName = isLoginForm ? 'Log In' : 'Cancel';
    const loginButtonType = isLoginForm ? 'submit' : 'button';
    const submitButtonType = isLoginForm ? 'button' : 'submit';
    const onLoginButtonClick = isLoginForm ? undefined : this.handleCardToggle;
    const onSignupButtonClick = isLoginForm ? this.handleCardToggle : undefined;

    return (
      <form className={className} onSubmit={this.handleFormSubmit}>
        <h2 className={`${block}__heading`}>
          {title}
        </h2>
        {/* LOGIN */}
        <UserInput
          block={block}
          modifier="login"
          value={login}
          type="text"
          isAlertVisible={isLoginAlertVisible}
          alertText={loginAlertText}
          onInputChange={this.handleInputChange}
          onInputBlur={this.handleLoginValidation}
        />
        {/* PASSWORD */}
        <UserInput
          block={block}
          modifier="password"
          value={password}
          type="password"
          isAlertVisible={isPasswordAlertVisible}
          alertText={passwordAlertText}
          onInputChange={this.handleInputChange}
          onInputBlur={this.handlePasswordValidation}
        />
        {/* PASSWORD CONFIRM */
        isLoginForm
        ? <div className="empty"></div>
        : <UserInput
            block={block}
            modifier="confirm"
            value={confirm}
            type="password"
            isAlertVisible={isConfirmAlertVisible}
            alertText={confirmAlertText}
            onInputChange={this.handleInputChange}
            onInputBlur={this.handleConfirmValidation}
            isInputDisabled={isConfirmPasswordDisabled}
          />
        }
        {/* BUTTONS */}
        <button
          className={`${block}__button ${block}__button--login`}
          onClick={onLoginButtonClick}
          type={loginButtonType}
        >
          {loginButtonName}
        </button>
        <button
          className={`${block}__button ${block}__button--signup`}
          onClick={onSignupButtonClick}
          type={submitButtonType}
        >
          Sign Up
        </button>
      </form>
    );
  }
}
export default UserForm;