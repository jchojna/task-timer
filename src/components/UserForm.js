import React, { Component } from 'react';
import classNames from 'classnames';
import UserInput from './UserInput';
import icons from '../assets/svg/icons.svg';
import '../scss/UserForm.scss';

class UserForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: '',
      password: '',
      confirm: '',
      isLoginValid: false,
      isPasswordValid: false,
      isConfirmValid: false,
      hasLogInFailed: false,
      shouldRemember: false
    }
  }

  componentDidMount = () => {
    const { block, users } = this.props;
    if (block === 'loginForm') {

      const rememberedUser = [...users].find(user => user.rememberMe);
      if (rememberedUser) {
        const { login, password } = rememberedUser;
        this.setState({
          login,
          password,
          isLoginValid: true,
          isPasswordValid: true,
          shouldRemember: true
        });
      }
    }
  }

  handleStateChange = (object) => this.setState(object);
  handleInputChange = (value, input) => this.setState({ [input]: value });

  handleCardToggle = () => {
    const { onCardToggle } = this.props;
    onCardToggle();
    this.handleFormReset();
  }

  handleRememberMe = () => {
    this.setState(prevState => ({ shouldRemember: !prevState.shouldRemember }));
  }

  handleFormReset = () => {
    this.setState({
      login: '',
      password: '',
      confirm: '',
      isLoginValid: false,
      isPasswordValid: false,
      isConfirmValid: false,
      shouldRemember: false
    });
  }

  handleFormSubmit = (e) => {
    e.preventDefault();
    const { block, users, onUserLogin } = this.props;
    const {
      login,
      password,
      isLoginValid,
      isPasswordValid,
      isConfirmValid,
      shouldRemember
    } = this.state;

    const user = [...users].find(user => user.login === login);

    const isLoginPasswordCorrect = block === 'loginForm'
    && isLoginValid
    && user.password === password;
    
    if (block === 'loginForm') {

      if (isLoginValid && isLoginPasswordCorrect) {
        onUserLogin(user, block);
        this.handleFormReset();
        
      } else {
        this.setState({ hasLogInFailed: true });
      }

    } else if (block === 'signupForm') {

      if (isLoginValid && isPasswordValid && isConfirmValid) {
        const newUser = {
          login,
          password,
          rememberMe: shouldRemember,
          tasks: []
        }

        onUserLogin(newUser, block);
        this.handleFormReset();

      } else return;
    }
  }

  render() {

    const { className, block, users } = this.props;

    const {
      login,
      password,
      confirm,
      isLoginValid,
      isPasswordValid,
      isConfirmValid,
      shouldRemember,
      hasLogInFailed
    } = this.state;

    const isLoginForm = block === 'loginForm';
    const title = isLoginForm ? 'Log In' : 'Sign Up';
    const loginButtonName = isLoginForm ? 'Log In' : 'Cancel';
    const loginButtonType = isLoginForm ? 'submit' : 'button';
    const submitButtonType = isLoginForm ? 'button' : 'submit';
    const onLoginButtonClick = isLoginForm ? undefined : this.handleCardToggle;
    const onSignupButtonClick = isLoginForm ? this.handleCardToggle : undefined;

    const checkboxClass = classNames('remember__checkbox',
    `remember__checkbox--${block}`, {
      'remember__checkbox--visible': shouldRemember
    });

    const alertBoxClass = classNames(
      `${block}__alertBox`,
      `${block}__alertBox--password`, {
      [`${block}__alertBox--visible`]: hasLogInFailed && isPasswordValid
    });

    const alertClass = `${block}__alert ${block}__alert--password`;

    return (
      <form className={className} onSubmit={this.handleFormSubmit}>
        <h2 className={`${block}__heading`}>{title}</h2>

        {/* LOGIN */}
        <UserInput
          block={block}
          modifier="login"
          value={login}
          isInputValid={isLoginValid}
          users={users}
          onInputChange={this.handleStateChange}
        />

        {/* PASSWORD */}
        <UserInput
          block={block}
          modifier="password"
          value={password}
          isInputValid={isPasswordValid}
          users={users}
          onInputChange={this.handleStateChange}
        />

        {/* LOG IN VALIDATION */
        isLoginForm
        ? <div className={alertBoxClass}>
            <p className={alertClass}>Password is not correct!</p>
          </div>
        : <div className="empty"></div>
        }

        {/* PASSWORD CONFIRM */
        isLoginForm
        ? <div className="empty"></div>
        : <UserInput
            block={block}
            modifier="confirm"
            value={confirm}
            password={password}
            isPasswordValid={isPasswordValid}
            isInputValid={isConfirmValid}
            users={users}
            onInputChange={this.handleStateChange}
          />
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