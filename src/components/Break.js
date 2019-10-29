import React from 'react';
import Display from './Display';
import '../scss/Break.scss';

const Break = (props) => {
  const {
    compClassName,
    breaksTotal,
    breakTimeElapsedArray
  } = props;
  
  return (
    <div className={compClassName}>
      <h3 className="Break__counter">
        {`${breaksTotal} ${breaksTotal === 1
        ? "break" : "breaks"}`}
      </h3>
      <Display
        compClassName="Break__display"
        taskTimeArray={breakTimeElapsedArray}
      />
    </div>
  );
}
export default Break;