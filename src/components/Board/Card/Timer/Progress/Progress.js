import React from 'react';
import classNames from 'classnames';
import styles from './Progress.module.scss';

const Progress = (props) => {
  const {
    modifier,
    isVisible,
    isElapsedMode,
    elapsedPercent,
    remainingPercent,
  } = props;

  const progressClass = classNames(
    styles.container,
    styles[`container--${modifier}`],
    {
      [styles['container--visible']]: isVisible,
    }
  );

  const elapsedPercentClass = classNames(
    styles.percent,
    styles[`percent--${modifier}`],
    {
      [styles['percent--visible']]: isElapsedMode,
    }
  );
  const remainingPercentClass = classNames(
    styles.percent,
    styles[`percent--${modifier}`],
    {
      [styles['percent--visible']]: !isElapsedMode,
    }
  );
  const loadingClass = classNames(
    styles.part,
    styles['part--loading'],
    styles[`part--${modifier}`]
  );
  const unloadingClass = classNames(
    styles.part,
    styles['part--unloading'],
    styles[`part--${modifier}`]
  );

  const roundedElapsedPercent = `${Math.round(elapsedPercent)}%`;
  const roundedRemainingPercent = `${Math.round(remainingPercent)}%`;
  const loadingWidth = {
    width: `${isElapsedMode ? elapsedPercent : remainingPercent}%`,
  };
  const unloadingWidth = {
    width: `${isElapsedMode ? remainingPercent : elapsedPercent}%`,
  };

  return (
    <section className={progressClass}>
      {/* PROGRESS HEADER */}
      <header className={styles.header}>
        <p className={elapsedPercentClass}>{roundedElapsedPercent}</p>
        <p className={remainingPercentClass}>{roundedRemainingPercent}</p>
      </header>
      {/* PROGRESS BAR */}
      <div className={styles.bar}>
        <div className={loadingClass} style={loadingWidth}></div>
        <div className={unloadingClass} style={unloadingWidth}></div>
      </div>
    </section>
  );
};
export default Progress;
