import React from 'react';
import '../scss/ProgressBar.scss';

const ProgressBar = () => {
  return (
    <div className="ProgressBar">
      <div className="ProgressBar__part ProgressBar__part--loading"></div>
      <div className="ProgressBar__part ProgressBar__part--unloading"></div>
    </div>
  );
}
export default ProgressBar;