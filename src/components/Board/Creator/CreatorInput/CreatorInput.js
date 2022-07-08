import React from 'react';
import classNames from 'classnames';
import { maxTaskNameLength } from 'lib/globalVariables';
import { taskNameProgressStyle } from 'lib/handlers';
import styles from './CreatorInput.module.scss';

const CreatorInput = (props) => {
  const {
    isVisible,
    isValid,
    modifier,
    title,
    label,
    minutes,
    seconds,
    placeholder,
    slideDirection,
    taskNameLength,
    onTaskNameChange,
    onMinutesChange,
    onSecondsChange,
    alertFlag,
  } = props;

  const creatorInputClass = classNames(styles.container, {
    [styles[`container--${modifier}`]]: isVisible,
    [styles.showFromRight]: isVisible && slideDirection === 'toRight',
    [styles.hideToLeft]: !isVisible && slideDirection === 'toRight',
    [styles.showFromLeft]: isVisible && slideDirection === 'toLeft',
    [styles.hideToRight]: !isVisible && slideDirection === 'toLeft',
  });

  const textInputClass = classNames(styles.text, {
    [styles['text--invalid']]: !isValid && alertFlag,
  });

  const timeInputsClass = classNames(styles.inputs, {
    [styles['inputs--invalid']]: !isValid && alertFlag,
  });

  const minutesInputClass = classNames(styles.input, styles['input--minutes'], {
    [styles['input--invalid']]: !isValid && alertFlag,
  });

  const secondsInputClass = classNames(styles.input, styles['input--seconds'], {
    [styles['input--invalid']]: !isValid && alertFlag,
  });

  return (
    <div className={creatorInputClass}>
      {/* INPUT LABEL */}
      <label htmlFor={modifier} className={styles.label}>
        {label}
      </label>

      {modifier === 'taskName' ? (
        /* TEXT INPUT */
        <div className={styles.textContainer}>
          <textarea
            id={modifier}
            className={textInputClass}
            placeholder={placeholder}
            spellCheck="false"
            maxLength={maxTaskNameLength}
            value={title}
            onChange={(e) => onTaskNameChange(e.target.value)}
          ></textarea>
          <div
            className={styles.progress}
            style={taskNameProgressStyle(taskNameLength)}
          ></div>
        </div>
      ) : (
        /* TIME INPUT */
        <div className={timeInputsClass}>
          <input
            id={modifier}
            name={`${modifier}Minutes`}
            className={minutesInputClass}
            placeholder="min"
            maxLength="2"
            value={minutes}
            onChange={(e) => onMinutesChange(e.target.value)}
          />
          <span className={styles.colon}>:</span>
          <input
            name={`${modifier}Seconds`}
            className={secondsInputClass}
            placeholder="sec"
            maxLength="2"
            value={seconds}
            onChange={(e) => onSecondsChange(e.target.value)}
          />
        </div>
      )}
    </div>
  );
};
export default CreatorInput;
