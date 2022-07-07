import React from 'react';
import classNames from 'classnames';
import TimeDisplay from './TimeDisplay';
import styles from './Countdown.module.scss';

const Countdown = (props) => {
  const {
    modifier,
    isElapsedMode,
    elapsedTimeArray,
    remainingTimeArray,
    isCountdownVisible,
    totalBreaks,
  } = props;

  const countdownClass = classNames(
    styles.container,
    styles[`container--${modifier}`],
    {
      [styles['Countdown--visible']]: isCountdownVisible,
      [styles.showFromRight]: isCountdownVisible && totalBreaks > 0,
      [styles.hideToLeft]: !isCountdownVisible,
    }
  );

  return (
    <div className={countdownClass}>
      {
        /* ACTIVE MODE */
        modifier === 'taskTime' ? (
          <h3 className={styles.heading}>Working Mode</h3>
        ) : (
          <h3 className={styles.heading}>Break Mode</h3>
        )
      }
      {
        /* ELAPSED / REMAINING TIME */
        isElapsedMode ? (
          <p className={styles.timeType}>Elapsed Time</p>
        ) : (
          <p className={styles.timeType}>Remaining Time</p>
        )
      }
      {/* TIMER DISPLAY */}
      <TimeDisplay
        type={modifier}
        isElapsedMode={isElapsedMode}
        elapsedTimeArray={elapsedTimeArray}
        remainingTimeArray={remainingTimeArray}
      />
    </div>
  );
};
export default Countdown;
