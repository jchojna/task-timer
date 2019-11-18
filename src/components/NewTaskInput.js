import React from 'react';
import classNames from 'classnames';
import '../scss/NewTaskInput.scss';

const NewTaskInput = (props) => {

  const {
    isVisible,
    modifier,
    title,
    label,
    minutes,
    seconds,
    placeholder,
    onTaskNameChange,
    onMinutesChange,
    onSecondsChange
  } = props;

  const newTaskInputClass = classNames("NewTaskInput", {
    [`NewTaskInput--${modifier}`]: isVisible
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
          className="NewTaskInput__text"
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
            className="NewTaskInput__input NewTaskInput__input--minutes"
            placeholder="min"
            maxLength="2"
            value={minutes}
            onChange={(e) => onMinutesChange(e.target.value)}
          />
          <span className="NewTaskInput__colon">:</span>
          <input
            name={`${modifier}Seconds`}
            className="NewTaskInput__input NewTaskInput__input--seconds"
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