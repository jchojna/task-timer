import React, { Component } from 'react';
import classNames from 'classnames';
import Task from './Task';
import '../scss/Draggable.scss';

class Draggable extends Component {
  constructor(props) {
    super(props);
    this.draggable = React.createRef();
    this.transitionTime = 300;
    this.state = {
      cardsSizes: [],
      isDragging: false,
      isHovered: false,
      isFixed: false,
      originalX: 0,
      originalY: 0,
      translateX: 0,
      translateY: 0
    }
  };

  componentWillUnmount() {
    window.removeEventListener('mousemove', this.handleMouseMove);
    window.removeEventListener('mouseup', this.handleMouseUp);
  }
  
  handleStateChange = (object) => this.setState(object);

  handleCardCollision = (x, y) => {
    const { dragIndex, onTaskOrderChange } = this.props;
    const { cardsSizes } = this.state;

    return [...cardsSizes].forEach((card, dropIndex) => {
      const { height, width, left, top } = card;
      if (x >= left && x <= left + width && y >= top && y <= top + height) {
        
        if (dragIndex === dropIndex) return;
        
        const offsetX = left - cardsSizes[dragIndex].left;
        const offsetY = top - cardsSizes[dragIndex].top;

        this.setState({
          translateX: offsetX,
          translateY: offsetY
        });

        // DOM manipulation
        // in order to apply translation style on sibling component
        // for visual animation effect before react overrides
        // component's style through props after changing components order
        const appNodes = this.draggable.current.parentNode.parentNode.children;
        const cards = [...appNodes]
          .filter(node => node.firstElementChild.classList.contains('Draggable'));
        const replacedCard = cards[dropIndex].firstElementChild;
        replacedCard.style.transform = `translate(${-1 * offsetX}px, ${-1 * offsetY}px)`;
        // DOM manipulation

        setTimeout(() => onTaskOrderChange(dragIndex, dropIndex), this.transitionTime);
      }
    });
  }

  handleMouseDown = ({ clientX, clientY }) => {
    if (!this.state.isFixed) {
      window.addEventListener('mousemove', this.handleMouseMove);
      window.addEventListener('mouseup', this.handleMouseUp);
  
      if (this.props.onDragStart) this.props.onDragStart();
      // get array of objects containing each card size and offset
      const appNodes = this.draggable.current.parentNode.parentNode.children;
      const cardsSizes = [...appNodes]
        .filter(node => node.firstElementChild.classList.contains('Draggable'))
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
        originalX: clientX + window.scrollX,
        originalY: clientY + window.scrollY,
        cardsSizes
      });
    }
  };

  handleMouseMove = ({ clientX, clientY }) => {
    if (!this.state.isFixed) {
      const { onDrag, onAppStateChange } = this.props;
  
      this.setState(prevState => ({
        translateX: clientX + window.scrollX - prevState.originalX,
        translateY: clientY + window.scrollY - prevState.originalY,
        isDragging: true,
      }),
      () => {
        if (onDrag) {
          onDrag({
            translateX: this.state.translateX,
            translateY: this.state.translateY
          });
        }
      });
      onAppStateChange({ isDraggingMode: true });
    }
  };

  handleMouseUp = ({ clientX, clientY }) => {
    const { onAppStateChange } = this.props;
    window.removeEventListener('mousemove', this.handleMouseMove);
    window.removeEventListener('mouseup', this.handleMouseUp);

    this.setState({
      originalX: 0,
      originalY: 0,
      translateX: 0,
      translateY: 0,
      isDragging: false
    },
    () => {
      if (this.props.onDragEnd) {
        this.props.onDragEnd();
      }
    });
    onAppStateChange({ isDraggingMode: false });
    const absoluteClientX = clientX + window.scrollX;
    const absoluteClientY = clientY + window.scrollY;
    this.handleCardCollision(absoluteClientX, absoluteClientY);
  };

  handleMouseOver = () => {
    const { isDraggingMode } = this.props;
    if (isDraggingMode) {
      if (this.state.isDragging) return;
      this.setState({isHovered: true});
    }
  }
  
  handleMouseOut = () => {
    const { isDraggingMode } = this.props;
    if (isDraggingMode) {
      this.setState({isHovered: false});
    }
  }

  render() {
    const { task, onTaskRemove, onAppStateChange } = this.props;
    const { isDragging, isHovered, translateX, translateY} = this.state;

    const draggableStyle = isDragging
    ? { transform: `translate(${translateX}px, ${translateY}px)` }
    : isHovered
      ? { transform: `rotate3d(0, 1, 0, -30deg)` }
      : { transform: `translate(${translateX}px, ${translateY}px)` }

    const draggableClass = classNames("Draggable", {
      "Draggable--dragging": isDragging,
      "Draggable--hovered": isHovered
    });

    return (
      <div
        className={draggableClass}
        style={draggableStyle}
        ref={this.draggable}
        onMouseDown={this.handleMouseDown}
        onMouseOver={this.handleMouseOver}
        onMouseOut={this.handleMouseOut}
        //onDraggableStateChange={this.handleStateChange}
      >
        <Task
          task={task}
          id={task.dateCreated}
          key={task.dateCreated}
          onTaskRemove={onTaskRemove}
          onAppStateChange={onAppStateChange}
        />
      </div>
    );
  }
}
export default Draggable;