import React from 'react';
import classNames from 'classnames';
import 'scss/StopAlert.scss';

const StopAlert = (props) => {
  const { alertText, isStopAlertVisible, onStopCancel, onStopConfirm } = props;

  const stopAlertClass = classNames('StopAlert', {
    'StopAlert--visible': isStopAlertVisible,
  });

  const containerClass = classNames('StopAlert__container', {
    'StopAlert__container--visible': isStopAlertVisible,
  });

  return (
    <section className={stopAlertClass}>
      <div className={containerClass}>
        <h2 className="StopAlert__heading">{alertText}</h2>
        <button
          className="StopAlert__button StopAlert__button--stop"
          onClick={onStopConfirm}
        >
          Yes
        </button>
        <button
          className="StopAlert__button StopAlert__button--cancel"
          onClick={onStopCancel}
        >
          Cancel
        </button>
      </div>
    </section>
  );
};
export default StopAlert;
