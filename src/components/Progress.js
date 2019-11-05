import React from 'react';
import Percentage from './Percentage';
import ProgressBar from './ProgressBar';
import '../scss/Progress.scss';

const Progress = (props) => {
  const { isElapsedMode, elapsedTaskPercent, remainingTaskPercent } = props;
  
  return (
    <section className="Progress">
      <header className="Progress__header">
        <Percentage
          compClassName={`Percentage ${isElapsedMode
          ? "Percentage--visible" : ""}`}
          percent={elapsedTaskPercent}
        />
        <Percentage
          compClassName={`Percentage ${isElapsedMode
          ? "" : "Percentage--visible"}`}
          percent={remainingTaskPercent}
        />
      </header>
      <ProgressBar
        percentElapsed={elapsedTaskPercent}
        percentRemaining={remainingTaskPercent}
        isElapsedMode={isElapsedMode}
      />
    </section>
  );
}
export default Progress;