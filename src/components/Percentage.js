import React from 'react';
import '../scss/Percentage.scss';

const Percentage = (props) => {
  const { compClassName, percent } = props;
  return (
    <p className={compClassName}>
      {`${Math.round(percent)}%`}
    </p>
  );
}
export default Percentage;