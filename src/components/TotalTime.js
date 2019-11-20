import React from 'react';
import classNames from 'classnames';
import EditableTime from './EditableTime';
import Spinners from './Spinners'
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
    onSecondsChange,
    onKeyPress
  } = props;

  const totalTimeClass = classNames(`TotalTime TotalTime--${modifier}`, {
    "TotalTime--disabled": isDisabled
  });

  const labelClass = classNames("TotalTime__label", {
    "TotalTime__label--editMode": isEditMode
  });

  const displayClass = classNames("TotalTime__display", {
    "TotalTime__display--editMode": isEditMode,
    "TotalTime__display--incorrect": !isValid
  });

  return (
    <div className={totalTimeClass}>
      {/* LABEL */}
      <label
        className={labelClass}
        htmlFor={`${modifier}-${id}`}
        onClick={onEditModeChange}
      >
        {labelName}
      </label>
      <div
        className={displayClass}
        onKeyDown={(e) => onKeyPress(e.key)}
        tabIndex="0"
      >
        <Spinners />
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
        <Spinners />
      </div>
    </div>
  );
}
export default TotalTime;