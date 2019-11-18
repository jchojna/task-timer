import React from 'react';
import classNames from 'classnames';
import '../scss/StopAlert.scss';

const StopAlert = (props) => {
  const {
    isStopAlertVisible,
    onStopCancel,
    onStopConfirm
  } = props;

  const stopAlertClass = classNames("StopAlert", {
    "StopAlert--visible": isStopAlertVisible
  });

  return (
    <section className={stopAlertClass}>
      <div className="StopAlert__container">
        <h2 className="StopAlert__heading">
          Are you sure you want to quit?
        </h2>
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
}
export default StopAlert;