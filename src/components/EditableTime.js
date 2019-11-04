import React from 'react';
import '../scss/Editable.scss';
import TimeDisplay from './TimeDisplay.js';

const EditableDisplay = (props) => {
    
  const {
    labelName,
    block,
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
    <div className={`${block} ${block}--${modifier}`}>
      {/* LABEL */}
      <label
        className={`${block}__label`}
        htmlFor={`${modifier}-${id}`}
        onClick={onEditModeChange}
      >
        {labelName}
      </label>
      
      {/* TEXT */}
      <p
        className={`${block}__text
        ${isEditMode ? "" : `${block}__text--visible`}`}
        onClick={onEditModeChange}
      >
        {`${minutes} : ${seconds}`}
      </p>

      {/* INPUT */}
      <TimeDisplay
        labelName={labelName}
        block={block}
        modifier={modifier}
        id={id}
        minutes={minutes}
        seconds={seconds}
        isValid={isValid}
        isEditMode={isEditMode}
        onMinutesChange={(value) => onMinutesChange(value)}
        onSecondsChange={(value) => onSecondsChange(value)}
      />
    </div>
  );
}
export default EditableDisplay;