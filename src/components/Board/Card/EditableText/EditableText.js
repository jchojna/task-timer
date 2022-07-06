import React from 'react';
import classNames from 'classnames';
import { maxTaskNameLength } from 'lib/globalVariables';
import { taskNameProgressStyle } from 'lib/handlers';
import './EditableText.module.scss';

const EditableText = (props) => {
  const {
    output,
    isValid,
    isMaximized,
    taskNameLength,
    isDisabled,
    isEditMode,
    onTaskNameChange,
    onEditModeChange,
  } = props;

  const editableTextClass = classNames('taskName', {
    'taskName--disabled': isDisabled,
    'taskName--maximized': isMaximized,
  });

  const textClass = classNames('taskName__text', {
    'taskName__text--visible': !isEditMode,
  });

  const inputContainerClass = classNames('taskName__inputContainer', {
    'taskName__inputContainer--visible': isEditMode,
  });

  const inputClass = classNames('taskName__input', {
    'taskName__input--incorrect': !isValid,
  });

  const progressClass = classNames('taskName__progress', {
    'taskName__progress--visible': isEditMode,
  });

  return (
    <div className={editableTextClass}>
      {/* TEXT TITLE */}
      <h2 className={textClass} onClick={onEditModeChange}>
        {`"${output}"`}
      </h2>
      {/* TEXT CONTAINER */}
      <div className={inputContainerClass}>
        {/* INPUT */}
        <textarea
          className={inputClass}
          value={output}
          spellCheck="false"
          maxLength={maxTaskNameLength}
          onChange={(e) => onTaskNameChange(e.target.value)}
        ></textarea>
        {/* TEXT PROGRESS */}
        <div
          className={progressClass}
          style={taskNameProgressStyle(taskNameLength)}
        ></div>
      </div>
    </div>
  );
};
export default EditableText;
