import React from 'react';
import classNames from 'classnames';
import '../scss/NewTaskInput.scss';

const NewTaskInput = (props) => {

  const {
    isVisible,
    isValid,
    modifier,
    title,
    label,
    minutes,
    seconds,
    placeholder,
    onTaskNameChange,
    onMinutesChange,
    onSecondsChange,
    alertFlag
  } = props;

  const newTaskInputClass = classNames("NewTaskInput", {
    [`NewTaskInput--${modifier}`]: isVisible
  });

  const textInputClass = classNames("NewTaskInput__text", {
    "NewTaskInput__text--invalid": !isValid && alertFlag
  });

  const minutesInputClass = classNames("NewTaskInput__input",
    "NewTaskInput__input--minutes", {
      "NewTaskInput__input--invalid": !isValid && alertFlag
    });

  const secondsInputClass = classNames("NewTaskInput__input",
    "NewTaskInput__input--seconds", {
      "NewTaskInput__input--invalid": !isValid && alertFlag
    });

  return (
    <div className={newTaskInputClass}>

      {/* INPUT LABEL */}
      <label
        htmlFor={modifier}
        className="NewTaskInput__label"
      >
        {label}
      </label>

      {
        modifier === "taskName"
        ? /* TEXT INPUT */
        <textarea
          id={modifier}
          className={textInputClass}
          placeholder={placeholder}
          spellCheck="false"
          value={title}
          onChange={(e) => onTaskNameChange(e.target.value)}
        ></textarea>

        : /* TIME INPUT */
        <div className="NewTaskInput__inputs">
          <input
            id={modifier}
            name={`${modifier}Minutes`}
            className={minutesInputClass}
            placeholder="min"
            maxLength="2"
            value={minutes}
            onChange={(e) => onMinutesChange(e.target.value)}
          />
          <span className="NewTaskInput__colon">:</span>
          <input
            name={`${modifier}Seconds`}
            className={secondsInputClass}
            placeholder="sec"
            maxLength="2"
            value={seconds}
            onChange={(e) => onSecondsChange(e.target.value)}
          />
        </div>
      }
    </div>
  )
}
export default NewTaskInput;