import React from 'react';
import '../scss/Editable.scss';
import Display from './Display';
import TimeDisplay from './TimeDisplay.js';

const EditableDisplay = (props) => {
    
  const {
    className,
    output,
    onTaskEdit,
    isEditMode,
    onEditModeChange
  } = props;

  return (
    <div className={className}>
      {/* TEXT */}
      <Display
        className={`${className}__text ${isEditMode
        ? "" : `${className}__text--visible`}`}
        output={output}
        onEditModeChange={onEditModeChange}
      />

      {/* INPUT */}
      <TimeDisplay
        className={`${className}__input ${isEditMode
        ? `${className}__input--visible` : ""}`}
      
      />
    </div>
  );
}
export default EditableDisplay;