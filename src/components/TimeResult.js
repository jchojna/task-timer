import React from 'react';
import '../scss/TimeResult.scss';

const TimeResult = (props) => {
  const {minutes, seconds, breakTimeElapsed, breakFlag} = props;

  return (
    <span className="TimeResult">
      <span className="TimeResult__message--bold">
        { minutes > 1
          ? ` ${minutes} minutes` : minutes === 1
          ? ` ${minutes} minute` : ""}
      </span>

      {minutes > 0 && (breakFlag ? breakTimeElapsed !== 0 : seconds !== 0)
      ? "and" : ""}

      <span className="TimeResult__message--bold">
        { seconds > 1
          ? ` ${seconds} seconds` : seconds === 1
          ? ` ${seconds} second` : breakFlag && breakTimeElapsed !== 0
          ? " a split second" : ""}
      </span>
    </span>
  );
}
export default TimeResult;