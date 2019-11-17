import React from 'react';
import classNames from 'classnames';
import icons from '../assets/svg/icons.svg';
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
    onBackButtonClick,
    onNextButtonClick,
    onTaskNameChange,
    onMinutesChange,
    onSecondsChange,
    onCreatorStateChange
  } = props;

  const handleBackButton = (e) => {
    e.preventDefault();
    onBackButtonClick(modifier);
  }
  
  const handleNextButton = (e) => {
    e.preventDefault();
    onNextButtonClick(modifier);
  }

  const handleCloseButton = (e) => {
    e.preventDefault();
    onCreatorStateChange({
      isTaskNameVisible: false,
      isTaskTimeVisible: false,
      isBreakTimeVisible: false,
      creatorTaskName: "",
      creatorTaskMinutes: "",
      creatorTaskSeconds: "",
      creatorBreakMinutes: "",
      creatorBreakSeconds: ""
    });
  }

  const newTaskInputClass = classNames("NewTaskInput", {
    [`NewTaskInput--${modifier}`]: isVisible
  });

  const backButtonClass = classNames("NewTaskInput__button",
    "NewTaskInput__button--back", {
    "NewTaskInput__button--visible": modifier !== "taskName"
  });
  
  const nextButtonClass = classNames("NewTaskInput__button",
    "NewTaskInput__button--next", {
    "NewTaskInput__button--visible": isValid
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

      {/* GO BACK BUTTON */}
      <button
        className={backButtonClass}
        onClick={handleBackButton}
      >
        <svg className="NewTaskInput__svg" viewBox="0 0 512 512">
          <use href={`${icons}#arrow-left`}></use>
        </svg>
      </button>

      {/* GO NEXT BUTTON */}
      <button
        className={nextButtonClass}
        onClick={handleNextButton}
      >
        <svg className="NewTaskInput__svg" viewBox="0 0 512 512">
          <use href={`${icons}#arrow-right`}></use>
        </svg>
      </button>

      {/* CLOSE NEW TASK */}
      <button
        className="NewTaskInput__button NewTaskInput__button--close NewTaskInput__button--visible"
        onClick={handleCloseButton}
      >
        <svg className="Task__svg" viewBox="0 0 512 512">
          <use href={`${icons}#remove`}/>
        </svg>
      </button>
    </div>
  )
}
export default NewTaskInput;