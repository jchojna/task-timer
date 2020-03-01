import React from 'react';

const UserInput = (props) => {
  const { block, modifier } = props;

  const inputId = `${block}-${modifier}`;
  const labelClass = `${block}__label ${block}__label--${modifier}`
  const inputClass = `${block}__input ${block}__input--${modifier}`
  const alertClass = `${block}__alert ${block}__alert--${modifier}`
  
  const alertBoxClass = `${block}__alertBox ${block}__alertBox--${modifier}`

  return (
    <React.Fragment>
      <label
        htmlFor={inputId}
        className={labelClass}
      >
        Login:
      </label>
      <input
        id={inputId}
        //ref={loginInput}
        type="text"
        name="userLogin"
        className={inputClass}
        spellCheck="false"
        maxLength="20"
      />
      <div className={alertBoxClass}>
        <p className={alertClass}>
          Please enter your login
        </p>
      </div>
    </React.Fragment>
  );
}
export default UserInput;