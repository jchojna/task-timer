import React from 'react';
import classNames from 'classnames';
import styles from '../TotalTime.module.scss';

const EditableTime = (props) => {
  const { id, name, unit, time, isEditMode, onTimeChange, onEditModeChange } =
    props;

  const textClass = classNames(styles.text, {
    [styles['text--visible']]: !isEditMode,
  });

  const timeClass = classNames(styles.input, styles[`input--${unit}`], {
    [styles['input--visible']]: isEditMode,
  });

  const placeholder = unit.slice(0, 3);

  return (
    <div className={classNames(styles.unit, styles[`unit--${unit}`])}>
      {/* TEXT */}
      <p className={textClass} onClick={onEditModeChange}>
        {time}
      </p>
      {/* INPUT */}
      <input
        id={id}
        name={name}
        className={timeClass}
        placeholder={placeholder}
        maxLength="2"
        value={time}
        onChange={(e) => onTimeChange(e.target.value)}
      />
    </div>
  );
};
export default EditableTime;
