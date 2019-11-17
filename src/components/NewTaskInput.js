import React from 'react';
import classNames from 'classnames';
import icons from '../assets/svg/icons.svg';
import '../scss/NewTaskInput.scss';

const NewTaskInput = (props) => {

  const {
    isVisible,
    modifier,
    label,
    placeholder,
    onBackClick,
    onNextClick
  } = props;

  const handleBackButtonClick = (e) => {
    e.preventDefault();
    onBackClick();
  }
  
  const handleNextButtonClick = (e) => {
    e.preventDefault();
    onNextClick();
  }

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

      {/* TEXT INPUT */}
      <textarea
        id={modifier}
        className="NewTaskInput__text"
        placeholder={placeholder}
      ></textarea>

      {/* GO BACK BUTTON */}
      <button
        className="NewTaskInput__button NewTaskInput__button--back"
        onClick={handleBackButtonClick}
      >
        <svg className="NewTaskInput__svg" viewBox="0 0 512 512">
          <use href={`${icons}#arrow-left`}></use>
        </svg>
      </button>

      {/* GO NEXT BUTTON */}
      <button
        className="NewTaskInput__button NewTaskInput__button--next"
        onClick={handleNextButtonClick}
      >
        <svg className="NewTaskInput__svg" viewBox="0 0 512 512">
          <use href={`${icons}#arrow-right`}></use>
        </svg>
      </button>
    </div>
  )
}
export default NewTaskInput;