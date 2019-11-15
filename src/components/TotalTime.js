import React from 'react';
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
    isEditMode,
    onEditModeChange,
    onMinutesChange,
    onSecondsChange
  } = props;


  return (
    <div className={`TotalTime TotalTime--${modifier}`}>
      {/* LABEL */}
      <label
        className="TotalTime__label"
        htmlFor={`${modifier}-${id}`}
        onClick={onEditModeChange}
      >
        {labelName}
      </label>
      {/* MINUTES */}
      <EditableTime
        id={`${modifier}-${id}`}
        name={`${modifier}Minutes`}
        unit="minutes"
        time={minutes}
        isValid={isValid}
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
        isValid={isValid}
        isEditMode={isEditMode}
        onTimeChange={(value) => onSecondsChange(value)}
        onEditModeChange={onEditModeChange}
      />
    </div>
  );
}
export default TotalTime;