import React from 'react';
import classNames from 'classnames';
import icons from '../assets/svg/icons.svg';
import '../scss/NewTaskInput.scss';

const NewTaskInput = (props) => {

  const {
    isVisible,
    isInvalid,
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
    onSecondsChange
  } = props;

  const handleBackButton = (e) => {
    e.preventDefault();
    onBackButtonClick(modifier);
  }
  
  const handleNextButton = (e) => {
    e.preventDefault();
    onNextButtonClick(modifier);
  }

  const newTaskInputClass = classNames("NewTaskInput", {
    [`NewTaskInput--${modifier}`]: isVisible
  });

  const alertClass = classNames("NewTaskInput__alert", {
    "NewTaskInput__alert--visible": isInvalid
  });

  const alertText = (modifier) => {
    switch (modifier) {
      case 'taskName':
        return "You have to enter your task name!";
      case 'taskTime':
        return "You have to enter correct task time!";
      case 'breakTime':
        return "Specify maximum time of all break correctly!";
      default: return;
    }
  }

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
          spellcheck="false"
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

      {/* ALERT */}
      <p className={alertClass}>{alertText(modifier)}</p>

      {/* GO BACK BUTTON */}
      <button
        className="NewTaskInput__button NewTaskInput__button--back"
        onClick={handleBackButton}
      >
        <svg className="NewTaskInput__svg" viewBox="0 0 512 512">
          <use href={`${icons}#arrow-left`}></use>
        </svg>
      </button>

      {/* GO NEXT BUTTON */}
      <button
        className="NewTaskInput__button NewTaskInput__button--next"
        onClick={handleNextButton}
      >
        <svg className="NewTaskInput__svg" viewBox="0 0 512 512">
          <use href={`${icons}#arrow-right`}></use>
        </svg>
      </button>
    </div>
  )
}
export default NewTaskInput;