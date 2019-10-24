import React from 'react';
import Controls from './Controls';
import '../scss/Timer.scss';

const Timer = () => {
  return (
    <section className="Timer Timer--visible">
      <div className="Timer__container">
        <h2 className="Timer__heading">Work on your task</h2>
        <Controls />
      </div>
    </section>
  );
}
export default Timer;