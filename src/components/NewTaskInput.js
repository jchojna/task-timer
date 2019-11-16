import React from 'react';
import classNames from 'classnames';
import icons from '../assets/svg/icons.svg';
import '../scss/NewTaskInput.scss';

const NewTaskInput = (props) => {

  const { label, placeholder } = props;

  const handleButtonClick = (e) => {
    e.preventDefault();
  }

  return (
    <div className="NewTaskInput">

      {/* INPUT LABEL */}
      <label
        for=""
        className="NewTaskInput__label"
      >
        {label}
      </label>

      {/* TEXT INPUT */}
      <textarea
        className="NewTaskInput__text"
        placeholder={placeholder}
      ></textarea>

      {/* GO BACK BUTTON */}
      <button
        className="NewTaskInput__button NewTaskInput__button--back"
        onClick={handleButtonClick}
      >
        <svg className="NewTaskInput__svg" viewBox="0 0 512 512">
          <use href={`${icons}#arrow-left`}></use>
        </svg>
      </button>

      {/* GO NEXT BUTTON */}
      <button
        className="NewTaskInput__button NewTaskInput__button--next"
        onClick={handleButtonClick}
      >
        <svg className="NewTaskInput__svg" viewBox="0 0 512 512">
          <use href={`${icons}#arrow-right`}></use>
        </svg>
      </button>
    </div>
  )
}
export default NewTaskInput;