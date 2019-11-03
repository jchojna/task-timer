import React from 'react';
import '../scss/Editable.scss';
import Display from './Display';
import TimeDisplay from './TimeDisplay.js';

const EditableDisplay = (props) => {
    
  const {
    block,
    modifier,
    timeArray,
    onTaskEdit,
    isEditMode,
    onEditModeChange
  } = props;

  return (
    <div className={`${block} ${block}__${modifier}`}>
      {/* TEXT */}
      <Display
        className={`${block}__text ${isEditMode
        ? "" : `${block}__text--visible`}`}
        output={timeArray}
        onEditModeChange={onEditModeChange}
      />

      {/* INPUT */}
      <TimeDisplay
        block={block}
        modifier={modifier}
        visible={isEditMode ? `${block}--visible` : ""}
        minutes={timeArray[0]}
        seconds={timeArray[1]}
      />
    </div>
  );
}
export default EditableDisplay;