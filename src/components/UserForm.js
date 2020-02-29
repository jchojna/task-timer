import React from 'react';
import classNames from 'classnames';
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
        type="text"
        className={`${id}__input ${id}__input--login`}
        spellCheck="false"
        //onChange={(e) => this.handleInputChange(e, 'Login')}
      />
      <label
        htmlFor={`${id}Password`}
        className={`${id}__label ${id}__label--password`}
      >
        Password:
      </label>
      <input
        id={`${id}Password`}
        type="password"
        className={`${id}__input ${id}__input--password`}
        spellCheck="false"
        //onChange={(e) => this.handleInputChange(e, 'Password')}
      />
      <button
        className={`${id}__button ${id}__button--login`}
        onClick={onLoginButtonClick}
      >
        {loginButtonName}
      </button>
      <button
        className={`${id}__button ${id}__button--signup`}
        onClick={onSignupButtonClick}
      >
        Sign Up
      </button>
    </section>
  );
}
export default UserForm;