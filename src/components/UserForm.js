import React from 'react';
import classNames from 'classnames';
import UserInput from './UserInput';
import '../scss/UserForm.scss';

const UserForm = (props) => {
  const {
    className,
    block,
    onCardToggle,
    onUserPanelStateChange
  } = props;

  const {
    isLoginAlertVisible,
    isPasswordAlertVisible,
    isConfirmAlertVisible
  } = props.userPanelState;

  const loginInput = React.createRef();
  const passwordInput = React.createRef();
  const passwordConfirm = React.createRef();

  const isLoginForm = block === 'loginForm';
  const title = isLoginForm ? 'Log In' : 'Sign Up';
  const loginButtonName = isLoginForm ? 'Log In' : 'Cancel';
  const loginButtonType = isLoginForm ? 'submit' : 'button';
  const submitButtonType = isLoginForm ? 'button' : 'submit';
  const onLoginButtonClick = isLoginForm ? undefined : onCardToggle;
  const onSignupButtonClick = isLoginForm ? onCardToggle : undefined;

  const loginAlertClass = classNames(`${block}__alertBox ${block}__alertBox--login`, {
    [`${block}__alertBox--visible`]: isLoginAlertVisible
  });

  const passwordAlertClass = classNames(`${block}__alertBox ${block}__alertBox--password`, {
    [`${block}__alertBox--visible`]: isPasswordAlertVisible
  });
  
  const confirmAlertClass = classNames(`${block}__alertBox ${block}__alertBox--confirm`, {
    [`${block}__alertBox--visible`]: isConfirmAlertVisible
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const { block, onUsersChange } = props;
    const loginInputValue = loginInput.current.value;
    const passwordInputValue = passwordInput.current.value;
    const passwordConfirmValue = passwordConfirm.current.value;

    onUserPanelStateChange({
      isLoginAlertVisible: loginInputValue === '' ? true : false,
      isPasswordAlertVisible: passwordInputValue === '' ? true : false,
      isConfirmAlertVisible: passwordConfirmValue === '' ? true : false,
    });

    if (loginInputValue === '' || passwordInputValue === '' || passwordConfirmValue === '')  return;

    
    if (block === 'loginForm') {



    } else if (block === 'signupForm') {

      const newUser = {
        login: loginInputValue,
        password: passwordInputValue
      }

      onUsersChange(newUser);      
    }
  }

  return (
    <form className={className} onSubmit={handleFormSubmit}>
      <h2 className={`${block}__heading`}>
        {title}
      </h2>
      {/* LOGIN */}
      <UserInput
        block={block}
        modifier="login"

        
      />
      {/* PASSWORD */}
      <UserInput
        block={block}
        modifier="password"

      />
      {/* PASSWORD CONFIRM */
      isLoginForm ? <div className="empty"></div> :
      <UserInput
        block={block}
        modifier="confirm"

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

      {/* LOGIN */}
      {/* <label
        htmlFor={`${id}Login`}
        className={`${id}__label ${id}__label--login`}
      >
        Login:
      </label>
      <input
        id={`${id}Login`}
        ref={loginInput}
        type="text"
        name="userLogin"
        className={`${id}__input ${id}__input--login`}
        spellCheck="false"
        maxLength="20"
      />
      <div className={loginAlertClass}>
        <p className={`${id}__alert`}>
          Please enter your login
        </p>
      </div> */}

      {/* PASSWORD */}
      {/* <label
        htmlFor={`${id}Password`}
        className={`${id}__label ${id}__label--password`}
      >
        Password:
      </label>
      <input
        id={`${id}Password`}
        ref={passwordInput}
        type="password"
        name="userPassword"
        className={`${id}__input ${id}__input--password`}
        maxLength="20"
      />
      <div className={passwordAlertClass}>
        <p className={`${id}__alert`}>
          Please enter your password
        </p>
      </div> */}

      { /* REPEAT PASSWORD */
        /* id === 'signupForm'
        ?
        <React.Fragment>
          <label
            htmlFor={`${id}Confirm`}
            className={`${id}__label ${id}__label--confirm`}
          >
            Confirm:
          </label>
          <input
            id={`${id}Confirm`}
            ref={passwordConfirm}
            type="password"
            name="userConfirm"
            className={`${id}__input ${id}__input--confirm`}
            maxLength="20"
          />
          <div className={confirmAlertClass}>
            <p className={`${id}__alert`}>
              Please confirm your password
            </p>
          </div>
        </React.Fragment>
        :
        <div className="empty"></div> */
      }
    </form>
  );
}
export default UserForm;