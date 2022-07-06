import React, { Component } from 'react';
import classNames from 'classnames';
import UserInput from './UserInput';
import icons from '../assets/svg/icons.svg';
import { getCapitalized } from '../lib/handlers.js';
import { User } from '../lib/classes.js';
import '../scss/UserForm.scss';

class UserForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rememberMe: false,
      // login
      login: '',
      isLoginValid: false,
      isLoginAlertVisible: false,
      loginAlertText: 'Please enter your login',
      // password
      password: '',
      isPasswordValid: false,
      isPasswordAlertVisible: false,
      passwordAlertText: 'Please enter your password',
      isPasswordPreviewMode: false,
      // password confirm
      confirm: '',
      isConfirmValid: false,
      isConfirmAlertVisible: false,
      confirmAlertText: 'Please confirm your password',
      isConfirmPreviewMode: false,
      isConfirmDisabled: true,
    };
  }

  componentDidMount = () => {
    const { block, users } = this.props;
    const rememberedUser = Object.values(users).find((user) => user.rememberMe);

    if (block === 'loginForm') {
      if (rememberedUser) {
        const { login, password } = rememberedUser;

        this.setState({
          login,
          isLoginValid: true,
          password,
          isPasswordValid: true,
          rememberMe: true,
        });
      }
    }
  };

  handleCardToggle = () => {
    const { onCardToggle } = this.props;
    onCardToggle();
    this.handleFormReset();
  };

  handleAlert = (value, input) => {
    const inputName = getCapitalized(input);
    const alertText = this.getInputAlert(value, input);

    this.setState({
      [`is${inputName}AlertVisible`]: true,
      [`${input}AlertText`]: alertText,
    });
  };

  getInputAlert = (value, input) => {
    const { password } = this.state;
    const isEmpty = value === '';
    const doesContainWhiteSpaces = /\s/g.test(value);
    const isPasswordTooShort = value.length < 6;

    switch (input) {
      case 'login':
        const { block, users } = this.props;

        const doesLoginExist = Object.values(users)
          .map((user) => user.login)
          .find((login) => login === value);

        const isLoginIncorrect = block === 'loginForm' && !doesLoginExist;
        const isNewLoginIncorrect =
          (block === 'signupForm' || block === 'userEdit') && doesLoginExist;

        return isEmpty
          ? 'Please enter your login'
          : isLoginIncorrect
          ? 'There is no user with this login'
          : isNewLoginIncorrect
          ? 'This login already exist. Try another one'
          : false;

      case 'password':
        return isEmpty
          ? 'Please enter your password'
          : doesContainWhiteSpaces
          ? 'Password cannot contain any spaces'
          : isPasswordTooShort
          ? 'Password should have at least 6 characters'
          : false;

      case 'confirm':
        const doPasswordsMatch = password === value;

        return isEmpty
          ? 'Please confirm your password'
          : !doPasswordsMatch
          ? 'Passwords do not match!'
          : false;

      default:
        return false;
    }
  };

  handleLoginValidation = (value) => {
    const isInvalid = this.getInputAlert(value, 'login') ? true : false;

    this.setState({
      login: value,
      isLoginValid: !isInvalid,
      isLoginAlertVisible: false,
    });
  };

  handlePasswordValidation = (value) => {
    const isInvalid = this.getInputAlert(value, 'password') ? true : false;

    this.setState({
      password: value,
      isPasswordValid: !isInvalid,
      isPasswordAlertVisible: false,
      isPasswordPreviewed: false,

      confirm: '',
      isConfirmValid: false,
      isConfirmAlertVisible: false,
      isConfirmPreviewMode: false,
      isConfirmDisabled: isInvalid,
    });
  };

  handleConfirmValidation = (value) => {
    const isInvalid = this.getInputAlert(value, 'confirm') ? true : false;

    this.setState({
      confirm: value,
      isConfirmValid: !isInvalid,
      isConfirmAlertVisible: false,
      isConfirmPreviewed: false,
    });
  };

  handlePasswordPreview = (input) => {
    const inputName = getCapitalized(input);

    this.setState((prevState) => ({
      [`is${inputName}PreviewMode`]: !prevState[`is${inputName}PreviewMode`],
    }));
  };

  handleRememberMe = () => {
    this.setState((prevState) => ({ rememberMe: !prevState.rememberMe }));
  };

  handleFormReset = () => {
    this.setState({
      rememberMe: false,
      login: '',
      isLoginValid: false,
      isLoginAlertVisible: false,
      password: '',
      isPasswordValid: false,
      isPasswordAlertVisible: false,
      isPasswordPreviewMode: false,
      confirm: '',
      isConfirmValid: false,
      isConfirmAlertVisible: false,
      isConfirmPreviewMode: false,
      isConfirmDisabled: true,
    });
  };

  handleFormSubmit = (e) => {
    e.preventDefault();
    const { block, users, onUserLogin } = this.props;
    const {
      login,
      password,
      isLoginValid,
      isPasswordValid,
      isConfirmValid,
      rememberMe,
    } = this.state;

    const user = Object.values(users).find((user) => user.login === login);

    const isLoginPasswordCorrect =
      block === 'loginForm' && isLoginValid && user.password === password;

    if (block === 'loginForm') {
      if (isLoginPasswordCorrect) {
        user.rememberMe = rememberMe;
        onUserLogin(user, block);
        this.handleFormReset();
      } else {
        this.setState({
          password: '',
          isPasswordValid: false,
          isPasswordAlertVisible: true,
          passwordAlertText: 'Password is wrong!',
          isPasswordPreviewMode: false,
        });
      }
    } else if (block === 'signupForm') {
      if (isLoginValid && isPasswordValid && isConfirmValid) {
        const date = new Date();
        const newUser = new User(date);
        newUser.login = login;
        newUser.password = password;
        newUser.rememberMe = rememberMe;

        onUserLogin(newUser, block);
        this.handleFormReset();
      } else return;
    }
  };

  render() {
    const { className, block } = this.props;

    const {
      rememberMe,
      login,
      isLoginValid,
      isLoginAlertVisible,
      loginAlertText,
      password,
      isPasswordValid,
      isPasswordAlertVisible,
      passwordAlertText,
      isPasswordPreviewMode,
      confirm,
      isConfirmValid,
      isConfirmAlertVisible,
      confirmAlertText,
      isConfirmPreviewMode,
      isConfirmDisabled,
    } = this.state;

    const isLoginForm = block === 'loginForm';
    const title = isLoginForm ? 'Log In' : 'Sign Up';
    const loginButtonName = isLoginForm ? 'Log In' : 'Cancel';
    const loginButtonType = isLoginForm ? 'submit' : 'button';
    const submitButtonType = isLoginForm ? 'button' : 'submit';
    const onLoginButtonClick = isLoginForm ? undefined : this.handleCardToggle;
    const onSignupButtonClick = isLoginForm ? this.handleCardToggle : undefined;

    const checkboxClass = classNames(
      'remember__checkbox',
      `remember__checkbox--${block}`,
      {
        'remember__checkbox--visible': rememberMe,
      }
    );

    return (
      <form className={className} onSubmit={this.handleFormSubmit}>
        <h2 className={`${block}__heading`}>{title}</h2>

        {/* LOGIN */}
        <UserInput
          inputId={`${block}Login`}
          inputName="login"
          parentName={block}
          value={login}
          label="Login:"
          isInputValid={isLoginValid}
          isAlertVisible={isLoginAlertVisible}
          alertText={loginAlertText}
          onInputBlur={this.handleAlert}
          onInputChange={this.handleLoginValidation}
        />

        {/* PASSWORD */}
        <UserInput
          inputId={`${block}Password`}
          inputName="password"
          parentName={block}
          value={password}
          label="Password:"
          isInputValid={isPasswordValid}
          isAlertVisible={isPasswordAlertVisible}
          alertText={passwordAlertText}
          isPreviewMode={isPasswordPreviewMode}
          onPreviewModeChange={this.handlePasswordPreview}
          onInputBlur={this.handleAlert}
          onInputChange={this.handlePasswordValidation}
        />

        {
          /* PASSWORD CONFIRM */
          isLoginForm ? (
            <div className="empty"></div>
          ) : (
            <UserInput
              inputId={`${block}Confirm`}
              inputName="confirm"
              parentName={block}
              value={confirm}
              label="Confirm:"
              isInputValid={isConfirmValid}
              isAlertVisible={isConfirmAlertVisible}
              alertText={confirmAlertText}
              isDisabled={isConfirmDisabled}
              isPreviewMode={isConfirmPreviewMode}
              onPreviewModeChange={this.handlePasswordPreview}
              onInputBlur={this.handleAlert}
              onInputChange={this.handleConfirmValidation}
            />
          )
        }

        {/* REMEMBER ME */}
        <div className="remember">
          <div
            className={`remember__field remember__field--${block}`}
            onClick={this.handleRememberMe}
          >
            <svg className={checkboxClass}>
              <use href={`${icons}#check`}></use>
            </svg>
          </div>
          <input
            id={`${block}Remember`}
            name={`${block}Remember`}
            className={`remember__input remember__input--${block}`}
            type="checkbox"
          />
          <label
            htmlFor={`${block}Remember`}
            className={`remember__label remember__label--${block}`}
            onClick={this.handleRememberMe}
          >
            Remember Me
          </label>
        </div>

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
