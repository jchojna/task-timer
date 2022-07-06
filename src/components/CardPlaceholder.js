import React from 'react';
import classNames from 'classnames';
import '../scss/CardPlaceholder.scss';

const CardPlaceholder = (props) => {
  const { placeholderIndex, cardsSizes, isPlaceholderVisible } = props;
  const placeholder = cardsSizes[placeholderIndex];
  let placeholderStyle = {};

  if (placeholder) {
    const { top, left, width, height } = placeholder;
    placeholderStyle = {
      top,
      left,
      width,
      height,
    };
  }

  const placeholderClass = classNames('CardPlaceholder', {
    'CardPlaceholder--visible': isPlaceholderVisible,
  });

  return <div className={placeholderClass} style={placeholderStyle}></div>;
};
export default CardPlaceholder;
