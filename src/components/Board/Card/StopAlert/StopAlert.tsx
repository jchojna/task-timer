import React from 'react';
import classNames from 'classnames';
import styles from './StopAlert.module.scss';

const StopAlert = (props) => {
  const { alertText, isStopAlertVisible, onStopCancel, onStopConfirm } = props;

  const stopAlertClass = classNames(styles.container, {
    [styles['container--visible']]: isStopAlertVisible,
  });

  const containerClass = classNames(styles.wrapper, {
    [styles['wrapper--visible']]: isStopAlertVisible,
  });

  return (
    <section className={stopAlertClass}>
      <div className={containerClass}>
        <h2 className={styles.heading}>{alertText}</h2>
        <button
          className={classNames(styles.button, styles['button--stop'])}
          onClick={onStopConfirm}
        >
          Yes
        </button>
        <button
          className={classNames(styles.button, styles['button--cancel'])}
          onClick={onStopCancel}
        >
          Cancel
        </button>
      </div>
    </section>
  );
};
export default StopAlert;
