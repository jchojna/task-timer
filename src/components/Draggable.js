import React, { Component } from 'react';
import classNames from 'classnames';
import '../scss/Draggable.scss';

class Draggable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDragging: false,
    
      originalX: 0,
      originalY: 0,
    
      translateX: 0,
      translateY: 0,
    
      lastTranslateX: 0,
      lastTranslateY: 0
    }
  }

  handleMouseDown = ({ clientX, clientY }) => {
    window.addEventListener('mousemove', this.handleMouseMove);
    window.addEventListener('mouseup', this.handleMouseUp);

    if (this.props.onDragStart) {
      this.props.onDragStart();
    }

    this.setState({
      originalX: clientX,
      originalY: clientY,
      isDragging: true
    });
  }

  render() {
    const { children } = this.props;
    const { isDragging, translateX, translateY } = this.state;

    const draggableStyle = {
      transform: `translate(${translateX}px, ${translateY}px)`
    }

    const draggableClass = classNames("Draggable", {
      "Draggable--dragging": isDragging
    });

    return (
      <div className={draggableClass}
        onMouseDown={this.handleMouseDown}
        //x={translateX}
        //y={translateY}
        isDragging={isDragging}
        style={draggableStyle}
      >
        {children}
      </div>
    );
  }
}
export default Draggable;