import React from 'react';
import '../scss/Editable.scss';
import TimeDisplay from './TimeDisplay.js';

const EditableDisplay = (props) => {
    
  const {
    block,
    modifier,
    minutes,
    seconds,
    isValid,
    onMinutesChange,
    onSecondsChange,
    isEditMode,
    onEditModeChange
  } = props;

  return (
    <div className={`${block} ${block}--${modifier}`}>
      {/* TEXT */}
      <p
        className={`${block}__text ${isEditMode
        ? "" : `${block}__text--visible`}`}
        onClick={onEditModeChange}
      >
        {`${minutes} : ${seconds}`}
      </p>

      {/* INPUT */}
      <TimeDisplay
        block={block}
        modifier={modifier}
        visible={isEditMode ? `${block}__inputs--visible` : ""}
        minutes={minutes}
        seconds={seconds}
        isValid={isValid}
        onMinutesChange={(value) => onMinutesChange(value)}
        onSecondsChange={(value) => onSecondsChange(value)}
      />
    </div>
  );
}
export default EditableDisplay;