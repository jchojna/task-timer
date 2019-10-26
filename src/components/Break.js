import React from 'react';
import Display from './Display';
import '../scss/Break.scss';

const Break = (props) => {
  return (
    <div className={props.compClassName}>
      <h3 className="Break__counter">
        {`${props.breaksTotal} ${props.breaksTotal === 1
        ? "break" : "breaks"}`}
      </h3>
      <Display
        compClassName="Break__display"
        taskTimeArray={props.breakTimeElapsedArray}
      />
    </div>
  );
}
export default Break;