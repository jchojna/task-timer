import React from 'react';
import Display from './Display';
import '../scss/Break.scss';

const Break = () => {
  return (
    <div className="Break">
      <h3 className="Break__counter">0 breaks</h3>
      <Display />
    </div>
  );
}
export default Break;