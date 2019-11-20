import React from 'react';
import classNames from 'classnames';
import EditableTime from './EditableTime.js';
import '../scss/TotalTime.scss';

const TotalTime = (props) => {

  const {
    labelName,
    modifier,
    id,
    minutes,
    seconds,
    isValid,
    isDisabled,
    isEditMode,
    onEditModeChange,
    onMinutesChange,
    onSecondsChange
  } = props;

  const totalTimeClass = classNames(`TotalTime TotalTime--${modifier}`, {
    "TotalTime--disabled": isDisabled
  });

  const displayClass = classNames("TotalTime__display", {
    "TotalTime__display--editMode": isEditMode,
    "TotalTime__display--incorrect": !isValid
  });

  return (
    <div
      className={totalTimeClass}
    >
      {/* LABEL */}
      <label
        className="TotalTime__label"
        htmlFor={`${modifier}-${id}`}
        onClick={onEditModeChange}
      >
        {labelName}
      </label>
      <div className={displayClass}>
        {/* MINUTES */}
        <EditableTime
          id={`${modifier}-${id}`}
          name={`${modifier}Minutes`}
          unit="minutes"
          time={minutes}
          isEditMode={isEditMode}
          onTimeChange={(value) => onMinutesChange(value)}
          onEditModeChange={onEditModeChange}
        />
        {/* SEPARATOR */}
        <span className="TotalTime__colon">{` : `}</span>
        {/* SECONDS */}
        <EditableTime
          name={`${modifier}Seconds`}
          unit="seconds"
          time={seconds}
          isEditMode={isEditMode}
          onTimeChange={(value) => onSecondsChange(value)}
          onEditModeChange={onEditModeChange}
        />
      </div>
    </div>
  );
}
export default TotalTime;