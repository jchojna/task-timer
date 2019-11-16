import React from 'react';
import classNames from 'classnames';

const EditableTime = (props) => {
  const {
    id,
    name,
    unit,
    time,
    isValid,
    isEditMode,
    onTimeChange,
    onEditModeChange
  } = props;
  
  const textClass = classNames("TotalTime__text", {
    "TotalTime__text--visible": !isEditMode
  });

  const timeClass = classNames("TotalTime__input",
    `TotalTime__input--${unit}`, {
    "TotalTime__input--visible": isEditMode,
    "TotalTime__input--incorrect": !isValid 
  });

  const placeholder = unit.slice(0,3);

  return (
    <div className={`TotalTime__unit TotalTime__unit--${unit}`}>
      {/* TEXT */}
      <p className={textClass} onClick={onEditModeChange}>
        {time}
      </p>
      {/* INPUT */}
      <input
        id={id}
        name={name}
        className={timeClass}
        placeholder={placeholder}
        maxLength="2"
        value={time}
        onChange={(e) => onTimeChange(e.target.value)}
      />
    </div>
  );
}
export default EditableTime;