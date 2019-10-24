import React from 'react';
import Percentage from './Percentage';
import ProgressBar from './ProgressBar';
import '../scss/Progress.scss';

const Progress = () => {
  return (
    <section className="Progress">
      <header className="Progress__header">
        <Percentage />
        <Percentage />
      </header>
      <ProgressBar />
    </section>
  );
}
export default Progress;