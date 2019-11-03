import React from 'react';
import '../scss/TimeDisplay.scss';

const TimeDisplay = (props) => {
  const {
    modifier,
    minutes,
    seconds,
    onMinutesChange,
    onSecondsChange
  } = props;

  return (
    <fieldset className={`Field Field--${modifier}`}>
      <input
        id={modifier}
        name={`${modifier}Minutes`}
        className="Field__input Field__input--minutes"
        placeholder="min"
        maxLength="2"
        value={minutes}
        onChange={(e) => onMinutesChange(e.target.value)}
      />
      <span className="Field__separator">:</span>
      <input
        name={`${modifier}Seconds`}
        className="Field__input Field__input--seconds"
        placeholder="sec"
        maxLength="2"
        value={seconds}
        onChange={(e) => onSecondsChange(e.target.value)}
      />
    </fieldset>
  );
}
export default TimeDisplay;