import React from 'react';
import classNames from 'classnames';
import icons from '../assets/svg/icons.svg';
import '../scss/UserInput.scss';

const UserInput = (props) => {
  
  const {
    inputId,
    inputName,
    parentName,
    value,
    label,
    isInputValid,
    isAlertVisible,
    alertText,
    isDisabled,
    isPreviewMode,
    onPreviewModeChange,
    onInputBlur,
    onInputChange
  } = props;

  const handleInputBlur = (value) => {
    if (!isInputValid) onInputBlur(value, inputName);
  }

  // #region [ Horizon ] CLASS NAMES

  const userInputClass = `
    UserInput UserInput--${parentName} UserInput--${inputName}
  `;

  const labelClass = classNames(
    'UserInput__label',
    `UserInput__label--${parentName}`, {
    'UserInput__label--disabled': isDisabled
  });

  const inputClass = classNames(
    'UserInput__input',
    `UserInput__input--${parentName}`, {
    'UserInput__input--disabled': isDisabled
  });

  const inputType = inputName === 'login'
  ? 'text'
  : isPreviewMode ? 'text' : 'password'

  const alertBoxClass = classNames(
    'UserInput__alertBox',
    `UserInput__alertBox--${parentName}`, {
    'UserInput__alertBox--visible': isAlertVisible
  });

  const passedClass = classNames(
    'inputPassed',
    `inputPassed--${parentName}`, {
    'inputPassed--visible': isInputValid
  });

  const previewClass = classNames(
    'previewPassword',
    `previewPassword--${parentName}`, {
    'previewPassword--active': isPreviewMode,
    'previewPassword--disabled': isDisabled
  });

  // #endregion
  
  return (
    <div className={userInputClass}>
      {/* LABEL */}
      <label htmlFor={inputId} className={labelClass}>
        {label}
      </label>

      {/* INPUT */}
      <input
        id={inputId}
        name={inputId}
        value={value}
        type={inputType}
        className={inputClass}
        spellCheck="false"
        maxLength="20"
        disabled={isDisabled}
        onBlur={(e) => handleInputBlur(e.target.value)}
        onChange={(e) => onInputChange(e.target.value)}
      />

      {/* ALERT */}
      <div className={alertBoxClass}>
        <p className="UserInput__alert">{alertText}</p>
      </div>

      {/* INDICATORS */}
      <div className="UserInput__icons">
        {/* PREVIEW PASSWORD */}
        {
        inputName === 'login'
        ? <div className="empty"></div>
        : <button
            type="button"
            className={previewClass}
            onClick={() => onPreviewModeChange(inputName)}
          >
            <svg className="previewPassword__svg" viewBox="0 0 100 100">
              <use href={`${icons}#preview`} />
            </svg>
          </button>
        }
        {/* INPUT CORRECT BADGE */}
        {
        (parentName === 'loginForm' && inputName === 'password') ||
        (parentName === 'userEdit' && inputName === 'oldPassword')
        ? <div className="empty"></div>
        : <div className={passedClass}>
            <svg className="inputPassed__svg" viewBox="0 0 100 100">
              <use href={`${icons}#passed`} />
            </svg>
          </div>
        }
      </div>
    </div>
  );
}
export default UserInput;