import React from 'react';
import classNames from 'classnames';
import EditableTime from './EditableTime';
import Spinners from './Spinners';
import styles from './TotalTime.module.scss';

const TotalTime = (props) => {
  const {
    labelName,
    modifier,
    id,
    isMaximized,
    minutes,
    seconds,
    isValid,
    isDisabled,
    isEditMode,
    isCardEditMode,
    onEditModeChange,
    onMinutesChange,
    onSecondsChange,
    onKeyPress,
  } = props;

  const totalTimeClass = classNames(
    styles.container,
    styles[`container--${modifier}`],
    {
      [styles['container--maximized']]: isMaximized,
      [styles['container--disabled']]: isDisabled,
      [styles['container--main']]: !isCardEditMode && modifier === 'taskTime',
    }
  );

  const labelClass = classNames(styles.label, {
    [styles['label--editMode']]: isEditMode,
  });

  const displayClass = classNames(styles.display, {
    [styles['display--editMode']]: isEditMode,
    [styles['display--incorrect']]: !isValid,
  });

  return (
    <div className={totalTimeClass}>
      {/* LABEL */}
      <label
        className={labelClass}
        htmlFor={`${modifier}-${id}`}
        onClick={onEditModeChange}
      >
        {labelName}
      </label>
      <div className={displayClass} onKeyDown={(e) => onKeyPress(e.key)}>
        <Spinners
          modifier="minutes"
          value={minutes}
          isValid={isValid}
          isEditMode={isEditMode}
          onTimeChange={(value) => onMinutesChange(value)}
        />
        {/* MINUTES */}
        <EditableTime
          id={`${modifier}-${id}`}
          name={`${modifier}Minutes`}
          unit="minutes"
          time={minutes}
          isEditMode={isEditMode}
          onTimeChange={(value) => onMinutesChange(value)}
          onEditModeChange={onEditModeChange}
        />
        {/* SEPARATOR */}
        <span className={styles.colon}>{` : `}</span>
        {/* SECONDS */}
        <EditableTime
          name={`${modifier}Seconds`}
          unit="seconds"
          time={seconds}
          isEditMode={isEditMode}
          onTimeChange={(value) => onSecondsChange(value)}
          onEditModeChange={onEditModeChange}
        />
        <Spinners
          modifier="seconds"
          value={seconds}
          isValid={isValid}
          isEditMode={isEditMode}
          onTimeChange={(value) => onSecondsChange(value)}
        />
      </div>
    </div>
  );
};
export default TotalTime;
