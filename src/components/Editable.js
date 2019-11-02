import React from 'react';
import '../scss/Editable.scss';

const Editable = (props) => {
  const { className, text } = props;
  
  return (
    <div className={className}>
      {/* TEXT TITLE */}
      <p className={`${className}__text`}>
        {`"${text}"`}
      </p>

      {/* EDITION ROW */}
      <div className={`${className}__row`}>
        <input
          className={`${className}__input`}
        />
        <button>
          OK
        </button>
        <button>
          EXIT
        </button>
      </div>
    </div>
  );
}
export default Editable;