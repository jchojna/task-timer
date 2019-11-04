import React from 'react';
import '../scss/Editable.scss';
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
    <div
      className={className}
      onClick={onEditModeChange}
    >
      {/* TEXT TITLE */}
      <h2
        className={`${className}__text ${isEditMode
        ? "" : `${className}__text--visible`}`}
      >
        {output}
      </h2>

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