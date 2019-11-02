import React from 'react';
import '../scss/Editable.scss';

const Editable = (props) => {
  const {
    className,
    text,
    isEditMode,
    onEditModeClick,
    onTaskEdit
  } = props;
  
  return (
    <div className={className}>
      {/* TEXT TITLE */}
      <p
        className={`${className}__text ${isEditMode
        ? "" : `${className}__text--visible`}`}
        onClick={() => onEditModeClick()}
      >
        {`"${text}"`}
      </p>

      {/* EDITION ROW */}
      <div
        className={`${className}__row ${isEditMode
        ? `${className}__row--visible` : ""}`}
      >
        <textarea
          className={`${className}__input`}
          defaultValue={text}
          spellCheck="false"
          onChange={(e) => onTaskEdit({
            taskName: e.target.value
          })}
        ></textarea>
        <button
          className={`button ${className}__button`}
          onClick={() => onEditModeClick()}
        >
          OK
        </button>
      </div>
    </div>
  );
}
export default Editable;