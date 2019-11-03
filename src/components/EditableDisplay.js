import React from 'react';
import '../scss/Editable.scss';
import Display from './Display';
import TimeDisplay from './TimeDisplay.js';

const EditableDisplay = (props) => {
    
  const {
    block,
    modifier,
    minutes,
    seconds,
    onMinutesChange,
    onSecondsChange,
    isEditMode,
    onEditModeChange
  } = props;

  return (
    <div className={`${block} ${block}__${modifier}`}>
      {/* TEXT */}
      <Display
        className={`${block}__text ${isEditMode
        ? "" : `${block}__text--visible`}`}
        output={`${minutes}:${seconds}`}
        onEditModeChange={onEditModeChange}
      />

      {/* INPUT */}
      <TimeDisplay
        block={block}
        modifier={modifier}
        visible={isEditMode ? `${block}--visible` : ""}
        minutes={minutes}
        seconds={seconds}
        onMinutesChange={(value) => onMinutesChange(value)}
        onSecondsChange={(value) => onSecondsChange(value)}
      />
    </div>
  );
}
export default EditableDisplay;