import React from 'react';
import '../scss/Task.scss';

const Editable = (props) => {
  const { className, text } = props;
  
  return (
    <div className={className}>
      <p className={`${className}__text`}>
        {`"${text}"`}
      </p>

    </div>
  );
}
export default Editable;