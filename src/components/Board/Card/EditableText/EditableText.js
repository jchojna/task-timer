import React from 'react';
import classNames from 'classnames';
import { maxTaskNameLength } from 'lib/globalVariables';
import { taskNameProgressStyle } from 'lib/handlers';
import styles from './EditableText.module.scss';

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

  const editableTextClass = classNames(styles.taskName, {
    [styles['taskName--disabled']]: isDisabled,
    [styles['taskName--maximized']]: isMaximized,
  });

  const textClass = classNames(styles.text, {
    [styles['text--visible']]: !isEditMode,
  });

  const inputContainerClass = classNames(styles.inputContainer, {
    [styles['inputContainer--visible']]: isEditMode,
  });

  const inputClass = classNames(styles.input, {
    [styles['input--incorrect']]: !isValid,
  });

  const progressClass = classNames(styles.progress, {
    [styles['progress--visible']]: isEditMode,
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
