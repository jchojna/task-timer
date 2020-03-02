import React from 'react';
import classNames from 'classnames';

const UserInput = (props) => {

  const {
    block,
    modifier,
    value,
    type,
    isAlertVisible,
    alertText,
    onInputChange,
    onInputBlur,
    isInputDisabled
  } = props;

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
        onChange={(e) => onInputChange(modifier, e.target.value)}
        className={inputClass}
        spellCheck="false"
        maxLength="20"
        disabled={isInputDisabled}
        onBlur={onInputBlur}
      />
      <div className={alertBoxClass}>
        <p className={alertClass}>{alertText}</p>
      </div>
    </React.Fragment>
  );
}
export default UserInput;