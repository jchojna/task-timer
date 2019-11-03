import React from 'react';
import '../scss/TimeDisplay.scss';

const TimeDisplay = (props) => {
  const {
    block,
    modifier,
    visible,
    minutes,
    seconds,
    onMinutesChange,
    onSecondsChange
  } = props;

  return (
    <fieldset
      className={`${block} ${block}--${modifier} ${visible ? visible : ""}`}
    >
      <input
        id={modifier}
        name={`${modifier}Minutes`}
        className={`${block}__input ${block}__input--minutes`}
        placeholder="min"
        maxLength="2"
        value={minutes}
        onChange={(e) => onMinutesChange(e.target.value)}
      />
      <span className="Field__separator">:</span>
      <input
        name={`${modifier}Seconds`}
        className={`${block}__input ${block}__input--seconds`}
        placeholder="sec"
        maxLength="2"
        value={seconds}
        onChange={(e) => onSecondsChange(e.target.value)}
      />
    </fieldset>
  );
}
export default TimeDisplay;