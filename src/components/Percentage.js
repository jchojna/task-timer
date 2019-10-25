import React from 'react';
import '../scss/Percentage.scss';

const Percentage = (props) => {
  return (
    <p className={props.compClassName}>
      {props.percent}
    </p>
  );
}
export default Percentage;