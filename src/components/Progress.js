import React from 'react';
import Percentage from './Percentage';
import ProgressBar from './ProgressBar';
import '../scss/Progress.scss';

const Progress = (props) => {
  return (
    <section className="Progress">
      <header className="Progress__header">
        <Percentage
          compClassName={`Percentage ${props.isElapsedMode
          ? "Percentage--visible" : ""}`}
          percent={props.percentElapsed}
        />
        <Percentage
          compClassName={`Percentage ${props.isElapsedMode
          ? "" : "Percentage--visible"}`}
          percent={props.percentRemaining}
        />
      </header>
      <ProgressBar
        percentElapsed={props.percentElapsed}
        percentRemaining={props.percentRemaining}
        isElapsedMode={props.isElapsedMode}
      />
    </section>
  );
}
export default Progress;