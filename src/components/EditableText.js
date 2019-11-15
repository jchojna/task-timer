import React from 'react';
import '../scss/EditableText.scss';

const EditableText = (props) => {
    
  const {
    className,
    output,
    isValid,
    isEditMode,
    onTaskNameChange,
    onEditModeChange
  } = props;

  return (
    <div
      className={className}
    >
      {/* TEXT TITLE */}
      <h2
        className={`${className}__text
        ${isEditMode ? "" : `${className}__text--visible`}`}
        onClick={onEditModeChange}
      >
        {`"${output}"`}
      </h2>

      {/* INPUT */}
      <textarea
        className={`${className}__input
        ${isEditMode ? `${className}__input--visible` : ""}
        ${isValid ? "" : `${className}__input--incorrect`}`}
        value={output}
        spellCheck="false"
        maxLength="80"
        onChange={(e) => onTaskNameChange(e.target.value)}
      ></textarea>
    </div>
  );
}
export default EditableText;