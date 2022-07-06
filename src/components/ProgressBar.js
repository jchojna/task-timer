import React from 'react';
import 'scss/ProgressBar.scss';

const ProgressBar = (props) => {
  const { isElapsedMode, percentElapsed, percentRemaining } = props;
  return (
    <div className="ProgressBar">
      <div
        className="ProgressBar__part ProgressBar__part--loading"
        style={{
          width: `${isElapsedMode ? percentElapsed : percentRemaining}%`,
        }}
      ></div>
      <div
        className="ProgressBar__part ProgressBar__part--unloading"
        style={{
          width: `${isElapsedMode ? percentRemaining : percentElapsed}%`,
        }}
      ></div>
    </div>
  );
};
export default ProgressBar;
