import React from 'react';
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