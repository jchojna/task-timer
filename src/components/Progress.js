import React from 'react';
import classNames from 'classnames';
import '../scss/Progress.scss';

const Progress = (props) => {
  const { isElapsedMode, elapsedPercent, remainingPercent } = props;
  const elapsedPercentClass = classNames("Progress__percent", {
    "Progress__percent--visible": isElapsedMode
  });
  const remainingPercentClass = classNames("Progress__percent", {
    "Progress__percent--visible": !isElapsedMode
  });
  const roundedElapsedPercent = `${Math.round(elapsedPercent)}%`;
  const roundedRemainingPercent = `${Math.round(remainingPercent)}%`;
  const loadingWidth = {
    width: `${isElapsedMode ? elapsedPercent : remainingPercent}%`
  };
  const unloadingWidth = {
    width: `${isElapsedMode ? remainingPercent : elapsedPercent}%`
  };
  
  return (
    <section className="Progress">
      <header className="Progress__header">
        <p className={elapsedPercentClass}>{roundedElapsedPercent}</p>
        <p className={remainingPercentClass}>{roundedRemainingPercent}</p>
      </header>

      <div className="Progress__bar">
        <div
          className="Progress__part Progress__part--loading"
          style={loadingWidth}
        ></div>
        <div
          className="Progress__part Progress__part--unloading"
          style={unloadingWidth}
        ></div>
      </div>
    </section>
  );
}
export default Progress;