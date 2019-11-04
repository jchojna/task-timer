import React from 'react';
import '../scss/Editable.scss';
//import TimeDisplay from './TimeDisplay.js';

const EditableText = (props) => {
    
  const {
    className,
    output,
    onTaskNameChange,
    isValid,
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
        ? `${className}__input--visible` : ""} ${isValid
          ? "" : `${className}__input--incorrect`}`}
        defaultValue={output}
        spellCheck="false"
        onChange={(e) => onTaskNameChange(e.target.value)}
      ></textarea>
    </div>
  );
}
export default EditableText;