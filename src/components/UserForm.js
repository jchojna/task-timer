import React from 'react';
import '../scss/UserForm.scss';

const UserForm = (props) => {
  const {
    className,
    id,
    onCardToggle,
    onUsersChange
  } = props;
  const loginInput = React.createRef();
  const passwordInput = React.createRef();

  const isLoginForm = id === 'loginForm';
  const title = isLoginForm ? 'Log In' : 'Sign Up';
  const loginButtonName = isLoginForm ? 'Log In' : 'Cancel';
  const loginButtonType = isLoginForm ? 'submit' : 'button';
  const submitButtonType = isLoginForm ? 'button' : 'submit';
  const onLoginButtonClick = isLoginForm ? undefined : onCardToggle;
  const onSignupButtonClick = isLoginForm ? onCardToggle : undefined;

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const loginInputValue = loginInput.current.value;
    const passwordInputValue = passwordInput.current.value;

    if (id === 'loginForm') {





    } else if (id === 'signupForm') {

      const newUser = {
        login: loginInputValue,
        password: passwordInputValue
      }

      onUsersChange(newUser);      
    }
  }



  return (
    <form className={className} onSubmit={handleFormSubmit}>
      <h2 className={`${id}__heading`}>
        {title}
      </h2>
      <label
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
      <label
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
        spellCheck="false"
        maxLength="20"
      />
      <button
        className={`${id}__button ${id}__button--login`}
        onClick={onLoginButtonClick}
        type={loginButtonType}
      >
        {loginButtonName}
      </button>
      <button
        className={`${id}__button ${id}__button--signup`}
        onClick={onSignupButtonClick}
        type={submitButtonType}
      >
        Sign Up
      </button>
    </form>
  );
}
export default UserForm;