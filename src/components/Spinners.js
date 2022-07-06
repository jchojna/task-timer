import React from 'react';
import classNames from 'classnames';
import icons from '../assets/svg/icons.svg';
import { getNumFromRange } from '../lib/handlers';
import '../scss/Spinners.scss';

const Spinners = (props) => {
  const { modifier, value, isValid, isEditMode, onTimeChange } = props;

  const handleValueChange = (value, operation) => {
    value = value === '' ? 0 : value;
    const newValue = getNumFromRange(value, operation, 0, 99);
    onTimeChange(newValue);
  };

  const spinnersClass = classNames('Spinners', [`Spinners--${modifier}`], {
    'Spinners--visible': isEditMode,
    'Spinners--disabled': !isValid,
  });

  return (
    <div className={spinnersClass}>
      {/* INCREASE BUTTON */}
      <button
        className="Spinners__button Spinners__button--increase"
        onClick={() => handleValueChange(value, 'increase')}
        disabled={!isValid}
      >
        <svg className="Spinners__svg" viewBox="0 0 512 512">
          <use href={`${icons}#arrow-up`}></use>
        </svg>
      </button>
      {/* DECREASE BUTTON */}
      <button
        className="Spinners__button Spinners__button--decrease"
        onClick={() => handleValueChange(value, 'decrease')}
        disabled={!isValid}
      >
        <svg className="Spinners__svg" viewBox="0 0 512 512">
          <use href={`${icons}#arrow-down`}></use>
        </svg>
      </button>
    </div>
  );
};
export default Spinners;
