import React, { Component } from 'react';
import classNames from 'classnames';
import '../scss/Draggable.scss';

class Draggable extends Component {
  constructor(props) {
    super(props);
    this.draggable = React.createRef();
    this.state = {
      cardsSizes: [],
      isDragging: false,
    
      originalX: 0,
      originalY: 0,
    
      translateX: 0,
      translateY: 0,
    
      lastTranslateX: 0,
      lastTranslateY: 0
    }
  };

  componentWillUnmount() {
    window.removeEventListener('mousemove', this.handleMouseMove);
    window.removeEventListener('mouseup', this.handleMouseUp);
  }

  handleCardCollision = (x, y) => {
    const { dragIndex, onTaskOrderChange } = this.props;
    const { cardsSizes } = this.state;

    return [...cardsSizes].forEach((card, dropIndex) => {
      const { height, width, left, top } = card;
      if (x >= left && x <= left + width && y >= top && y <= top + height) {

        if (dragIndex === dropIndex) return;
        onTaskOrderChange(dragIndex, dropIndex);
      }
    });
  }

  handleMouseDown = ({ clientX, clientY }) => {
    window.addEventListener('mousemove', this.handleMouseMove);
    window.addEventListener('mouseup', this.handleMouseUp);

    if (this.props.onDragStart) this.props.onDragStart();

    // get array of objects containing each card size and offset
    const appNodes = this.draggable.current.parentNode.children;
    const cardsSizes = [...appNodes]
      .filter(card => card.classList.contains('Draggable'))
      .map(card => {
        const { offsetHeight, offsetLeft, offsetTop, offsetWidth } = card;
        return {
          height: offsetHeight,
          width: offsetWidth,
          left: offsetLeft,
          top: offsetTop
        }
      });

    this.setState({
      originalX: clientX,
      originalY: clientY,
      isDragging: true,
      cardsSizes
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

  handleMouseUp = ({ clientX, clientY }) => {
    window.removeEventListener('mousemove', this.handleMouseMove);
    window.removeEventListener('mouseup', this.handleMouseUp);

    this.setState({
      originalX: 0,
      originalY: 0,
      translateX: 0,
      translateY: 0,
      //lastTranslateX: this.state.translateX,
      //lastTranslateY: this.state.translateY,
      isDragging: false
    },
    () => {
      if (this.props.onDragEnd) {
        this.props.onDragEnd();
      }
    });
    this.handleCardCollision(clientX, clientY);
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
        style={draggableStyle}
        ref={this.draggable}
      >
        {children}
      </div>
    );
  }
}
export default Draggable;