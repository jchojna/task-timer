import React from 'react';
import classNames from 'classnames';
import icons from 'assets/svg/icons.svg';
import styles from './UserInput.module.scss';

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
    onInputChange,
  } = props;

  const handleInputBlur = (value) => {
    if (!isInputValid) onInputBlur(value, inputName);
  };

  const userInputClass = classNames(
    styles.container,
    styles[`container--${parentName}`],
    styles[`container--${inputName}`]
  );

  const labelClass = classNames(styles.label, styles[`label--${parentName}`], {
    [styles['label--disabled']]: isDisabled,
  });

  const inputClass = classNames(styles.input, styles[`input--${parentName}`], {
    [styles['input--disabled']]: isDisabled,
  });

  const inputType =
    inputName === 'login' ? 'text' : isPreviewMode ? 'text' : 'password';

  const alertBoxClass = classNames(
    styles.alertBox,
    styles[`alertBox--${parentName}`],
    {
      [styles['alertBox--visible']]: isAlertVisible,
    }
  );

  const passedClass = classNames(
    styles.inputPassed,
    styles[`inputPassed--${parentName}`],
    {
      [styles['inputPassed--visible']]: isInputValid,
    }
  );

  const previewClass = classNames(
    styles.previewPassword,
    styles[`previewPassword--${parentName}`],
    {
      [styles['previewPassword--active']]: isPreviewMode,
      [styles['previewPassword--disabled']]: isDisabled,
    }
  );

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
        <p className={styles.alert}>{alertText}</p>
      </div>

      {/* INDICATORS */}
      <div className={styles.icons}>
        {/* PREVIEW PASSWORD */}
        {inputName === 'login' ? (
          <div className="empty"></div>
        ) : (
          <button
            type="button"
            className={previewClass}
            onClick={() => onPreviewModeChange(inputName)}
          >
            <svg className={styles.svg} viewBox="0 0 100 100">
              <use href={`${icons}#preview`} />
            </svg>
          </button>
        )}
        {/* INPUT CORRECT BADGE */}
        {(parentName === 'loginForm' && inputName === 'password') ||
        (parentName === 'userEdit' && inputName === 'oldPassword') ? (
          <div className="empty"></div>
        ) : (
          <div className={passedClass}>
            <svg className={styles.svg} viewBox="0 0 100 100">
              <use href={`${icons}#passed`} />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
};
export default UserInput;
