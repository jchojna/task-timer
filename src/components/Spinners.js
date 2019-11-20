import React from 'react';
import classNames from 'classnames';
import icons from '../assets/svg/icons.svg';
import '../scss/Spinners.scss';

const Spinners = (props) => {

  const {
    modifier,
    value,
    isValid,
    isEditMode,
    onTimeChange
  } = props;

  const increaseValue = (value) => {
    let incValue = parseInt(value) + 1;
    incValue = incValue <= 99
    ? incValue >= 10
      ? incValue.toString() : `0${incValue}`
    : "99";
    onTimeChange(incValue);
  }

  const decreaseValue = (value) => {
    let decValue = parseInt(value) - 1;
    decValue = decValue >= 0
    ? decValue >= 10
      ? decValue.toString() : `0${decValue}`
    : "00";
    onTimeChange(decValue);
  }

  const spinnersClass = classNames("Spinners", [`Spinners--${modifier}`], {
    "Spinners--visible": isEditMode,
    "Spinners--disabled": !isValid
  });

  return (
    <div className={spinnersClass}>
      {/* INCREASE BUTTON */}
      <button
        className="Spinners__button Spinners__button--increase"
        onClick={() => increaseValue(value)}
        disabled={!isValid}
      >
        <svg className="Spinners__svg" viewBox="0 0 512 512">
          <use href={`${icons}#arrow-up`}></use>
        </svg>
      </button>
      {/* DECREASE BUTTON */}
      <button
        className="Spinners__button Spinners__button--decrease"
        onClick={() => decreaseValue(value)}
        disabled={!isValid}
      >
        <svg className="Spinners__svg" viewBox="0 0 512 512">
          <use href={`${icons}#arrow-down`}></use>
        </svg>
      </button>
    </div>
  );
}
export default Spinners;