import React from 'react';
import '../scss/UserForm.scss';

const UserForm = (props) => {
  const {
    className,
    id,
    title,
    loginButtonName,
    onLoginButtonClick,
    onSignupButtonClick
  } = props;

  const loginInput = React.createRef();
  const passwordInput = React.createRef();

  const handleLoginButtonClick = () => {
    const loginInputValue = loginInput.current.value;
    const passwordInputValue = passwordInput.current.value;
    onLoginButtonClick(loginInputValue, passwordInputValue)
  }

  const handleSignupButtonClick = () => {
    const loginInputValue = loginInput.current.value;
    const passwordInputValue = passwordInput.current.value;
    onSignupButtonClick(loginInputValue, passwordInputValue)
  }

  return (
    <section className={className}>
      <h2 className={`${id}__heading`}>{title}</h2>
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
        className={`${id}__input ${id}__input--login`}
        spellCheck="false"
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
        className={`${id}__input ${id}__input--password`}
        spellCheck="false"
      />
      <button
        className={`${id}__button ${id}__button--login`}
        onClick={handleLoginButtonClick}
      >
        {loginButtonName}
      </button>
      <button
        className={`${id}__button ${id}__button--signup`}
        onClick={handleSignupButtonClick}
      >
        Sign Up
      </button>
    </section>
  );
}
export default UserForm;