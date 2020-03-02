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
      isPasswordPreviewed: false,
      isConfirmPreviewed: false,
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
    this.handleFormReset();
  }

  handleInputChange = (input, value) => {
    const inputName = input.charAt(0).toUpperCase() + input.substring(1);
    input === 'password'
    ? this.setState({
        password: value,
        isPasswordAlertVisible: false,
        confirm: '',
        isConfirmPasswordValid: false,
        isConfirmAlertVisible: false,
        isConfirmPreviewed: false,
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
    const doesContainWhiteSpaces = /\s/g.test(login);
    const doesLoginExist = [...logins].filter(l => l === login).length > 0;
    const isLoginIncorrect = block === 'loginForm' && !doesLoginExist;
    const isNewLoginIncorrect = block === 'signupForm' && doesLoginExist;

    // handle alert text
    const loginAlertText = isEmpty ? 'Please enter your login' :
    doesContainWhiteSpaces ? 'Login cannot contain any spaces' :
    isLoginIncorrect ? 'There is no user with this login' :
    isNewLoginIncorrect ? 'This login already exist. Try another one' : '';

    const isInvalid = isEmpty
    || doesContainWhiteSpaces
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
    const { isLoginInputValid, password } = this.state;
    //const 

    const isEmpty = password === '';
    const doesContainWhiteSpaces = /\s/g.test(password);
    const isPasswordTooShort = password.length < 6;
    
    // handle alert text
    const passwordAlertText = isEmpty ? 'Please enter your password' :
    doesContainWhiteSpaces ? 'Password cannot contain any spaces' :
    isPasswordTooShort ? 'Password should have at least 6 signs' : '';

    const isInvalid = isEmpty
    || doesContainWhiteSpaces
    || isPasswordTooShort;

    if (!isLoginInputValid) {
      this.handleLoginValidation();
    }

    if (isInvalid) {
      this.setState({
        isPasswordInputValid: false,
        isPasswordAlertVisible: true,
        isConfirmPasswordDisabled: true,
        passwordAlertText
      });
      return false;

    } else {
      this.setState({
        isPasswordInputValid: true,
        isPasswordAlertVisible: false,
        isConfirmPasswordDisabled: false
      });
      return true;
    }
  }

  handleConfirmValidation = () => {
    const { password, confirm } = this.state;

    const isEmpty = confirm === '';
    const doPasswordsMatch = password === confirm;
        
    if (isEmpty || !doPasswordsMatch) {
      const confirmAlertText = isEmpty ? 'Please confirm your password' :
      !doPasswordsMatch ? 'Passwords do not match' : '';

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

  handlePasswordPreview = (input) => {
    this.setState(prevState => ({
      [`is${input}Previewed`]: !prevState[`is${input}Previewed`]
    }));
  }

  handleFormReset = () => {
    this.setState({
      login: '',
      password: '',
      confirm: '',
      isLoginInputValid: false,
      isPasswordInputValid: false,
      isConfirmPasswordValid: false,
      isLoginAlertVisible: false,
      isPasswordAlertVisible: false,
      isConfirmAlertVisible: false,
      isConfirmPasswordDisabled: true,
      isPasswordPreviewed: false,
      isConfirmPreviewed: false,
    });
  }

  handleFormSubmit = (e) => {
    e.preventDefault();
    const { block, users, onUsersChange } = this.props;
    const {
      isLoginInputValid,
      isPasswordInputValid,
      isConfirmPasswordValid,
      login,
      password
    } = this.state;

    const isLoginPasswordCorrect = block === 'loginForm' && isLoginInputValid
    && [...users].filter(user => user.login === login)[0].password === password;
    
    if (block === 'loginForm') {

      if (isLoginInputValid && isLoginPasswordCorrect) {

        console.log('logged in');
        // login process
        // login process
        // login process
        this.handleFormReset();
        
      } else {
        this.setState({
          isPasswordAlertVisible: true,
          passwordAlertText: 'Password is incorrect!'
        });
      }

    } else if (block === 'signupForm') {

      if (isLoginInputValid && isPasswordInputValid && isConfirmPasswordValid) {
        const newUser = {
          login: login,
          password: password
        }
        onUsersChange(newUser);
        this.handleFormReset();

      } else return;
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
      isLoginInputValid,
      isPasswordInputValid,
      isConfirmPasswordValid,
      isLoginAlertVisible,
      isPasswordAlertVisible,
      isConfirmAlertVisible,
      loginAlertText,
      passwordAlertText,
      confirmAlertText,
      isConfirmPasswordDisabled,
      isPasswordPreviewed,
      isConfirmPreviewed
    } = this.state;

    const isLoginForm = block === 'loginForm';
    const title = isLoginForm ? 'Log In' : 'Sign Up';
    const loginButtonName = isLoginForm ? 'Log In' : 'Cancel';
    const loginButtonType = isLoginForm ? 'submit' : 'button';
    const submitButtonType = isLoginForm ? 'button' : 'submit';
    const onLoginButtonClick = isLoginForm ? undefined : this.handleCardToggle;
    const onSignupButtonClick = isLoginForm ? this.handleCardToggle : undefined;
    const passwordInputType = isPasswordPreviewed ? 'text' : 'password';
    const confirmInputType = isConfirmPreviewed ? 'text' : 'password';

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
          isInputValid={isLoginInputValid}
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
          type={passwordInputType}
          isInputValid={isPasswordInputValid}
          isAlertVisible={isPasswordAlertVisible}
          alertText={passwordAlertText}
          onPreviewClick={this.handlePasswordPreview}
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
            type={confirmInputType}
            isInputValid={isConfirmPasswordValid}
            isAlertVisible={isConfirmAlertVisible}
            alertText={confirmAlertText}
            onPreviewClick={this.handlePasswordPreview}
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