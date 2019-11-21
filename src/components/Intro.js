import React from 'react';
import '../scss/Intro.scss';

const Intro = () => {

  return (
    <div className="Intro">
      <svg className="logo" viewBox="0 0 600 600">
        {/* MASK */}
        <mask id="mask" className="logo__mask">
          <rect width="600" height="600" fill="#fff"/>
          <rect
            x="200"
            y="50"
            width="200"
            height="35"
            rx="17.5"
            ry="17.5"
            fill="#000"
          />
          <circle cx="300" cy="300" r="180" fill="#000"/>
          <circle cx="300" cy="300" r="145" fill="#fff"/>
          <rect
            x="282.5"
            y="282.5"
            width="35"
            height="125"
            rx="17.5"
            ry="17.5"
            fill="#000"
            className="logo__clockHand"
          />
        </mask>
        {/* ELEMENTS */}
        <rect width="600" height="600" className="logo__background"/>
        <rect
          x="199"
          y="49"
          width="202"
          height="37"
          className="logo__letter logo__letter--top"
        />
        <circle
          cx="300"
          cy="300"
          r="140"
          className="logo__letter logo__letter--circle"
        />
        <rect width="600" height="600" className="logo__shadow" mask="url(#mask)"/>
        <rect width="600" height="600" className="logo__foreground" mask="url(#mask)"/>
      </svg>
    </div>
  );
}
export default Intro;