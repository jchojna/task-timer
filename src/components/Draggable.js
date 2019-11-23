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
  };

  handleMouseDown = ({ clientX, clientY }) => {
    window.addEventListener('mousemove', this.handleMouseMove);
    window.addEventListener('mouseup', this.handleMouseUp);

    if (this.props.onDragStart) {
      this.props.onDragStart();
      console.log('test');
    }

    this.setState({
      originalX: clientX,
      originalY: clientY,
      isDragging: true
    });
  };

  handleMouseMove = ({ clientX, clientY }) => {
    const { isDragging } = this.state;
    const { onDrag } = this.props;

    if (!isDragging) return;

    this.setState(prevState => ({
      translateX: clientX - prevState.originalX + prevState.lastTranslateX,
      translateY: clientY - prevState.originalY + prevState.lastTranslateY
    }),
    () => {
      if (onDrag) {
        onDrag({
          translateX: this.state.translateX,
          translateY: this.state.translateY
        });
      }
    });
  };

  handleMouseUp = () => {
    window.removeEventListener('mousemove', this.handleMouseMove);
    window.removeEventListener('mouseup', this.handleMouseUp);

    this.setState({
      originalX: 0,
      originalY: 0,
      lastTranslateX: this.state.translateX,
      lastTranslateY: this.state.translateY,
      isDragging: false
    },
    () => {
      if (this.props.onDragEnd) {
        this.props.onDragEnd();
      }
    });
  };

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