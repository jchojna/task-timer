import React from 'react';
import '../scss/ProgressBar.scss';

const ProgressBar = (props) => {
  return (
    <div className="ProgressBar">
      <div
        className="ProgressBar__part ProgressBar__part--loading"
        style={{width: `${props.isElapsedMode
          ? props.percentElapsed
          : props.percentRemaining}%`}}
      ></div>
      <div
        className="ProgressBar__part ProgressBar__part--unloading"
        style={{width: `${props.isElapsedMode
          ? props.percentRemaining
          : props.percentElapsed}%`}}
      ></div>
    </div>
  );
}
export default ProgressBar;