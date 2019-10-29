import React from 'react';
import Percentage from './Percentage';
import ProgressBar from './ProgressBar';
import '../scss/Progress.scss';

const Progress = (props) => {
  const { isElapsedMode, percentElapsed, percentRemaining } = props;
  
  return (
    <section className="Progress">
      <header className="Progress__header">
        <Percentage
          compClassName={`Percentage ${isElapsedMode
          ? "Percentage--visible" : ""}`}
          percent={percentElapsed}
        />
        <Percentage
          compClassName={`Percentage ${isElapsedMode
          ? "" : "Percentage--visible"}`}
          percent={percentRemaining}
        />
      </header>
      <ProgressBar
        percentElapsed={percentElapsed}
        percentRemaining={percentRemaining}
        isElapsedMode={isElapsedMode}
      />
    </section>
  );
}
export default Progress;