import React from 'react';
import classNames from 'classnames';
import icons from 'assets/svg/icons.svg';
import { getNumFromRange } from 'lib/handlers';
import styles from './Spinners.module.scss';

const Spinners = (props) => {
  const { modifier, value, isValid, isEditMode, onTimeChange } = props;

  const handleValueChange = (value, operation) => {
    value = value === '' ? 0 : value;
    const newValue = getNumFromRange(value, operation, 0, 99);
    onTimeChange(newValue);
  };

  const spinnersClass = classNames(
    styles.container,
    styles[`container--${modifier}`],
    {
      [styles['container--visible']]: isEditMode,
      [styles['container--disabled']]: !isValid,
    }
  );

  return (
    <div className={spinnersClass}>
      {/* INCREASE BUTTON */}
      <button
        className={classNames(styles.button, styles['button--increase'])}
        onClick={() => handleValueChange(value, 'increase')}
        disabled={!isValid}
      >
        <svg className={styles.svg} viewBox="0 0 512 512">
          <use href={`${icons}#arrow-up`}></use>
        </svg>
      </button>
      {/* DECREASE BUTTON */}
      <button
        className={classNames(styles.button, styles['button--decrease'])}
        onClick={() => handleValueChange(value, 'decrease')}
        disabled={!isValid}
      >
        <svg className={styles.svg} viewBox="0 0 512 512">
          <use href={`${icons}#arrow-down`}></use>
        </svg>
      </button>
    </div>
  );
};
export default Spinners;
