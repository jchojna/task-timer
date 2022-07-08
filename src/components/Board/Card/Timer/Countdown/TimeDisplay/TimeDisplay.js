import React from 'react';
import classNames from 'classnames';
import styles from './TimeDisplay.module.scss';

const TimeDisplay = (props) => {
  const { type, elapsedTimeArray, remainingTimeArray, isElapsedMode } = props;

  const elapsedTimeResult =
    type === 'taskTime'
      ? elapsedTimeArray.join(' : ')
      : elapsedTimeArray.slice(0, 2).join(' : ');

  const remainingTimeResult =
    type === 'taskTime'
      ? remainingTimeArray.join(' : ')
      : remainingTimeArray.slice(0, 2).join(' : ');

  const elapsedTimeClass = classNames(styles.type, styles['type--elapsed'], {
    [styles['type--visible']]: isElapsedMode,
    [styles['type--showUp']]: isElapsedMode,
    [styles['type--hideUp']]: !isElapsedMode,
  });

  const remainingTimeClass = classNames(
    styles.type,
    styles['type--remaining'],
    {
      [styles['type--visible']]: !isElapsedMode,
      [styles['type--showUp']]: !isElapsedMode,
      [styles['type--hideUp']]: isElapsedMode,
    }
  );

  return (
    <div className={styles.container}>
      <div className={elapsedTimeClass}>{elapsedTimeResult}</div>
      <div className={remainingTimeClass}>{remainingTimeResult}</div>
    </div>
  );
};
export default TimeDisplay;
