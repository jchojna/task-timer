import React from 'react';
import classNames from 'classnames';
import icons from '../assets/svg/icons.svg';
import '../scss/Spinners.scss';

const Spinners = ({ isEditMode, modifier }) => {

  const spinnersClass = classNames("Spinners", [`Spinners--${modifier}`], {
    "Spinners--visible": isEditMode
  });

  return (
    <div className={spinnersClass}>
      {/* INCREASE BUTTON */}
      <button className="Spinners__button Spinners__button--increase">
        <svg className="Spinners__svg" viewBox="0 0 512 512">
          <use href={`${icons}#arrow-up`}></use>
        </svg>
      </button>
      {/* DECREASE BUTTON */}
      <button className="Spinners__button Spinners__button--decrease">
        <svg className="Spinners__svg" viewBox="0 0 512 512">
          <use href={`${icons}#arrow-down`}></use>
        </svg>
      </button>
    </div>
  );
}
export default Spinners;