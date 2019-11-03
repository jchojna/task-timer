import React from 'react';
import '../scss/Editable.scss';
import Display from './Display';
//import TimeDisplay from './TimeDisplay.js';

const Editable = (props) => {
    
  const {
    className,
    output,
    onTaskEdit,
    isEditMode,
    onEditModeChange
  } = props;

  return (
    <div className={className}>
      {/* TEXT TITLE */}
      <Display
        className={`${className}__text ${isEditMode
        ? "" : `${className}__text--visible`}`}
        output={output}
        onEditModeChange={onEditModeChange}
      />

      {/* INPUT */}
      <textarea
        className={`${className}__input ${isEditMode
        ? `${className}__input--visible` : ""}`}
        defaultValue={output}
        spellCheck="false"
        onChange={(e) => onTaskEdit(e.target.value)}
      ></textarea>
    </div>
  );
}
export default Editable;