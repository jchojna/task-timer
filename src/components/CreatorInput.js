import React from 'react';
import classNames from 'classnames';
import '../scss/CreatorInput.scss';

const CreatorInput = (props) => {

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

  const creatorInputClass = classNames("CreatorInput", {
    [`CreatorInput--${modifier}`]: isVisible
  });

  const textInputClass = classNames("CreatorInput__text", {
    "CreatorInput__text--invalid": !isValid && alertFlag
  });

  const minutesInputClass = classNames("CreatorInput__input",
    "CreatorInput__input--minutes", {
      "CreatorInput__input--invalid": !isValid && alertFlag
    });

  const secondsInputClass = classNames("CreatorInput__input",
    "CreatorInput__input--seconds", {
      "CreatorInput__input--invalid": !isValid && alertFlag
    });

  return (
    <div className={creatorInputClass}>

      {/* INPUT LABEL */}
      <label
        htmlFor={modifier}
        className="CreatorInput__label"
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
        <div className="CreatorInput__inputs">
          <input
            id={modifier}
            name={`${modifier}Minutes`}
            className={minutesInputClass}
            placeholder="min"
            maxLength="2"
            value={minutes}
            onChange={(e) => onMinutesChange(e.target.value)}
          />
          <span className="CreatorInput__colon">:</span>
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
export default CreatorInput;