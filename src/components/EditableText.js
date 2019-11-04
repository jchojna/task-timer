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
    <div className={className}>
      {/* TEXT TITLE */}
      <h2
        className={`${className}__text ${isEditMode
        ? "" : `${className}__text--visible`}`}
        onClick={onEditModeChange}
      >
        {output}
      </h2>

      {/* INPUT */}
      <textarea
        className={`${className}__textInput ${isEditMode
        ? `${className}__textInput--visible` : ""}`}
        defaultValue={output}
        spellCheck="false"
        onChange={(e) => onTaskEdit(e.target.value)}
      ></textarea>
    </div>
  );
}
export default Editable;