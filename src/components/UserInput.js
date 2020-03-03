import React from 'react';
import classNames from 'classnames';
import icons from '../assets/svg/icons.svg';

const UserInput = (props) => {

  const {
    block,
    modifier,
    value,
    type,
    isInputValid,
    isAlertVisible,
    alertText,
    isPreviewMode,
    onPreviewClick,
    onInputChange,
    onInputBlur,
    isInputDisabled
  } = props;

  const handleInputDefocus = () => {
    if (!isInputValid) {
      onInputBlur(modifierName);
    }
  }

  const modifierName = modifier.charAt(0).toUpperCase() + modifier.substring(1);
  const inputId = block + modifierName;

  const labelClass = classNames(`${block}__label ${block}__label--${modifier}`, {
    [`${block}__label--disabled`]: isInputDisabled
  });

  const inputClass = classNames(`${block}__input ${block}__input--${modifier}`, {
    [`${block}__input--disabled`]: isInputDisabled
  });

  const alertBoxClass = classNames(`${block}__alertBox`,
  `${block}__alertBox--${modifier}`, {
    [`${block}__alertBox--visible`]: isAlertVisible && !isInputDisabled,
  });

  const alertClass = `${block}__alert ${block}__alert--${modifier}`;
  const iconsClass = `${block}__icons ${block}__icons--${modifier}`;
  const passedClass = classNames(`inputPassed inputPassed--${block}`, {
    'inputPassed--visible': isInputValid
  });
  const previewClass = classNames(`previewPassword previewPassword--${block}`, {
    'previewPassword--active': isPreviewMode,
    'previewPassword--disabled': isInputDisabled
  });
  
  return (
    <React.Fragment>
      <label htmlFor={inputId} className={labelClass}>
        {`${modifierName}:`}
      </label>
      <input
        id={inputId}
        type={type}
        name={inputId}
        value={value}
        onChange={(e) => onInputChange(e.target.value)}
        className={inputClass}
        spellCheck="false"
        maxLength="20"
        disabled={isInputDisabled}
        onBlur={handleInputDefocus}
      />
      <div className={alertBoxClass}>
        <p className={alertClass}>{alertText}</p>
      </div>
      <div className={iconsClass}>
        {
        modifier === 'password' || modifier === 'confirm'
        ? <button
            type="button"
            className={previewClass}
            onClick={() => onPreviewClick(modifierName)}
          >
            <svg className="previewPassword__svg" viewBox="0 0 100 100">
              <use href={`${icons}#preview`} />
            </svg>
          </button>
        : <div className="empty"></div>
        }
        {
        block === 'loginForm' && modifier === 'password'
        ? <div className="empty"></div>
        : <div className={passedClass}>
            <svg className="inputPassed__svg" viewBox="0 0 100 100">
              <use href={`${icons}#passed`} />
            </svg>
          </div>
        }
      </div>
    </React.Fragment>
  );
}
export default UserInput;