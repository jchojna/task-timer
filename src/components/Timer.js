import React from 'react';
import Controls from './Controls';
import Display from './Display';
import Break from './Break';
import '../scss/Timer.scss';

const Timer = () => {
  return (
    <section className="Timer Timer--visible">
      <div className="Timer__container">
        <h2 className="Timer__heading">Work on your task</h2>
        <Controls />
        <div className="Timer__display">
          <Display />
          <Display />
        </div>
        <Break />
      </div>
    </section>
  );
}
export default Timer;