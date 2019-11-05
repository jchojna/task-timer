import React from 'react';
import TimeDisplay from './TimeDisplay';
import '../scss/Break.scss';

const Break = (props) => {
  const {
    compClassName,
    totalBreaks,
    breakTimeElapsedArray
  } = props;
  
  return (
    <div className={compClassName}>
      <h3 className="Break__counter">
        {`${totalBreaks} ${totalBreaks === 1
        ? "break" : "breaks"}`}
      </h3>
      <TimeDisplay
        className="Break__display"
        timeArray={breakTimeElapsedArray}
      />
    </div>
  );
}
export default Break;