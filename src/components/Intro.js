import React, { Component } from 'react';
import '../scss/Intro.scss';
import { clearInterval } from 'timers';

class Intro extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalTime: 5000,
      maxDistance: 4,
      elapsedDistance: 0,
      elapsedAngle: 120,
      elapsedTime: 0,
      xTranslation: 0,
      yTranslation: 0
    }
  }

  componentDidMount() {
    const { totalTime, maxDistance } = this.state;

    const timeInterval = 10;
    const totalIntervals = totalTime / timeInterval
    const distanceIncrement = maxDistance / totalIntervals;
    const factor = 3;

    /* INTERVAL */
    this.intervalId = setInterval(() => {
      const { elapsedTime, elapsedDistance, elapsedAngle } = this.state;
      const easeOut = factor / Math.pow(factor, 2 * (elapsedTime / totalTime));
      const angleIncrement = 360 / totalIntervals * easeOut; // ! to fix

      const radians = elapsedAngle * (Math.PI / 180);
      const x = Math.sin(radians) * (elapsedDistance);
      const y = Math.cos(radians) * (elapsedDistance);

      if ( elapsedTime < totalTime ) {
  
        this.setState(prevState => ({
          elapsedTime: elapsedTime + timeInterval,
          elapsedDistance: prevState.elapsedDistance + distanceIncrement,
          elapsedAngle: prevState.elapsedAngle - angleIncrement,
          xTranslation: x,
          yTranslation: y
        }));
      }
    }, timeInterval);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  render() {
    const { xTranslation, yTranslation } = this.state;

    const styleObject = {
      transform: `
        translate(${xTranslation}%, ${yTranslation}%)
        rotate(0.01deg)
      `
    };

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
          <rect
            width="600"
            height="600"
            className="logo__shadow"
            mask="url(#mask)"
            style={styleObject}
          />
          <rect
            width="600"
            height="600"
            className="logo__foreground"
            mask="url(#mask)"
          />
        </svg>
      </div>
    );
  }
}
export default Intro;