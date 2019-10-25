import React from 'react';
import Controls from './Controls';
import Display from './Display';
import Break from './Break';
import Progress from './Progress';
import '../scss/Timer.scss';

const Timer = (props) => {
  return (
    <section className={`Timer ${props.compClassName}`}>
      <div className="Timer__container">
        <h2 className="Timer__heading">Work on your task</h2>

        {/* CONTROL BUTTONS */}
        <Controls
          isActive={props.isActive}
          changeDisplayMode={props.changeDisplayMode}
        />

        {/* TIMER DISPLAY */}
        <div className="Timer__display">
          <Display
            compClassName={props.isElapsedMode
              ? "Display--visible Display--showUp"
              : "Display--hideUp"}
          />
          <Display
            compClassName={props.isElapsedMode
              ? "Display--hideUp"
              : "Display--visible Display--showUp"}
          />
        </div>

        {/* BREAK */}
        <Break />

        {/* PROGRESS */}
        <Progress />
      </div>
    </section>
  );
}
export default Timer;