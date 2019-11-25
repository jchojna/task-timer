import React from 'react';
import classNames from 'classnames';
import '../scss/CreatorInput.scss';
import { maxTaskNameLength } from '../lib/globalVariables';
import { taskNameProgressStyle } from '../lib/handlers';

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
    slideDirection,
    taskNameLength,
    onTaskNameChange,
    onMinutesChange,
    onSecondsChange,
    alertFlag
  } = props;

  const creatorInputClass = classNames("CreatorInput", {
    [`CreatorInput--${modifier}`]: isVisible,
    "showFromRight": isVisible && slideDirection === 'toRight',
    "hideToLeft": !isVisible && slideDirection === 'toRight',
    "showFromLeft": isVisible && slideDirection === 'toLeft',
    "hideToRight": !isVisible && slideDirection === 'toLeft'
  });

  const textInputClass = classNames("CreatorInput__text", {
    "CreatorInput__text--invalid": !isValid && alertFlag
  });

  const timeInputsClass = classNames("CreatorInput__inputs", {
    "CreatorInput__inputs--invalid": !isValid && alertFlag
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
        <div className="CreatorInput__textContainer">
          <textarea
            id={modifier}
            className={textInputClass}
            placeholder={placeholder}
            spellCheck="false"
            maxLength={maxTaskNameLength}
            value={title}
            onChange={(e) => onTaskNameChange(e.target.value)}
          ></textarea>
          <div
            className="CreatorInput__progress"
            style={taskNameProgressStyle(taskNameLength)}
          ></div>
        </div>

        : /* TIME INPUT */
        <div className={timeInputsClass}>
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