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

      {/* INPUT */}
      <textarea
        className={`${className}__input ${isEditMode
        ? `${className}__input--visible` : ""}`}
        defaultValue={text}
        spellCheck="false"
        onChange={(e) => onTaskEdit({
          taskName: e.target.value
        })}
      ></textarea>
    </div>
  );
}
export default Editable;