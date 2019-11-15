import React from 'react';
import classNames from 'classnames';
import '../scss/EditableText.scss';

const EditableText = (props) => {
    
  const {
    output,
    isValid,
    isDisabled,
    isEditMode,
    onTaskNameChange,
    onEditModeChange
  } = props;

  const editableTextClass = classNames("taskName", {
    "taskName--disabled": isDisabled
  });

  const textClass = classNames("taskName__text", {
    "taskName__text--visible": !isEditMode
  })

  const inputClass = classNames("taskName__input", {
    "taskName__input--visible": isEditMode,
    "taskName__input--incorrect": !isValid
  })

  return (
    <div className={editableTextClass}>
      {/* TEXT TITLE */}
      <h2 className={textClass} onClick={onEditModeChange}>
        {`"${output}"`}
      </h2>
      {/* INPUT */}
      <textarea
        className={inputClass}
        value={output}
        spellCheck="false"
        maxLength="80"
        onChange={(e) => onTaskNameChange(e.target.value)}
      ></textarea>
    </div>
  );
}
export default EditableText;