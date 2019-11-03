import React from 'react';
import '../scss/TimeDisplay.scss';

const TimeDisplay = (props) => {
  const {
    className,
    modifier,
    minutes,
    seconds,
    onMinutesChange,
    onSecondsChange
  } = props;

  return (
    <fieldset className={`${className} ${className}--${modifier}`}>
      <input
        id={modifier}
        name={`${modifier}Minutes`}
        className={`${className}__input ${className}__input--minutes`}
        placeholder="min"
        maxLength="2"
        value={minutes}
        onChange={(e) => onMinutesChange(e.target.value)}
      />
      <span className="Field__separator">:</span>
      <input
        name={`${modifier}Seconds`}
        className={`${className}__input ${className}__input--seconds`}
        placeholder="sec"
        maxLength="2"
        value={seconds}
        onChange={(e) => onSecondsChange(e.target.value)}
      />
    </fieldset>
  );
}
export default TimeDisplay;