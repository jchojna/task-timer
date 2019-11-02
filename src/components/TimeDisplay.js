import React from 'react';
import '../scss/TimeDisplay.scss';

const TimeDisplay = (props) => {
  const {
    modifier,
    minutes,
    seconds
  } = props;

  return (
    <fieldset className={`Field Field--${modifier}`}>
      <input
        id="taskTime"
        name="taskTimeMinutes"
        className="Field__input Field__input--minutes"
        placeholder="min"
        maxLength="2"
        defaultValue={minutes}
        onChange={(e) => this.handlePlannedTaskTime(e)}
      />
      <span className="Field__separator">:</span>
      <input
        name="taskTimeSeconds"
        className="Field__input Field__input--seconds"
        placeholder="sec"
        maxLength="2"
        defaultValue={seconds}
        onChange={(e) => this.handlePlannedTaskTime(e)}
      />
    </fieldset>
  );
}
export default TimeDisplay;