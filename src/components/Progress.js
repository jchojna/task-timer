import React from 'react';
import classNames from 'classnames';
import '../scss/Progress.scss';

const Progress = (props) => {
  const {
    modifier,
    isVisible,
    isElapsedMode,
    elapsedPercent,
    remainingPercent
  } = props;

  const progressClass = classNames("Progress", {
    "Progress--visible": isVisible,
    "Progress--taskTime": modifier === "taskTime",
    "Progress--breakTime": modifier === "breakTime"
  });

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
    <section className={progressClass}>
      {/* PROGRESS HEADER */}
      <header className="Progress__header">
        <p className={elapsedPercentClass}>{roundedElapsedPercent}</p>
        <p className={remainingPercentClass}>{roundedRemainingPercent}</p>
      </header>
      {/* PROGRESS BAR */}
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