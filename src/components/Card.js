import React, { Component } from 'react';
import classNames from 'classnames';
import Task from './Task';
import '../scss/Card.scss';

class Card extends Component {
  constructor(props) {
    super(props);
    this.card = React.createRef();
    this.draggable = React.createRef();
    this.transitionTime = 1000;
    this.state = {
      isDragging: false,
      originalX: 0,
      originalY: 0,
      translateX: 0,
      translateY: 0
    };
  }

  componentWillUnmount() {
    window.removeEventListener('mousemove', this.handleMouseMove);
    window.removeEventListener('mouseup', this.handleMouseUp);
  }

  getHoveredCardSizes = (index) => {
    const {cardIndex, cardsSizes } = this.props;
    return index >= 0
    ? index !== cardIndex
      ? cardsSizes[index]
      : null
    : null; 
  }
  
  handleStateChange = (object) => this.setState(object);

  handleCardsSizes = () => {
    const { onBoardStateChange } = this.props;
    const appNodes = this.card.current.parentNode.children;

    const cardsSizes = [...appNodes]
    .filter(node => node.classList.contains('Card'))
    .map(card => {
      const { offsetHeight, offsetLeft, offsetTop, offsetWidth } = card;
      return {
        height: offsetHeight,
          width: offsetWidth,
          left: offsetLeft,
          top: offsetTop
        }
      }
    );
    onBoardStateChange({ cardsSizes });
  }

  handleMouseDown = ({ clientX, clientY }) => {
    const { onBoardStateChange } = this.props;

    window.addEventListener('mousemove', this.handleMouseMove);
    window.addEventListener('mouseup', this.handleMouseUp);
      
    this.setState({
      originalX: clientX + window.scrollX,
      originalY: clientY + window.scrollY
    });
    this.handleCardsSizes();

    onBoardStateChange({
      isPlaceholderVisible: true
    });
  };

  handleMouseMove = ({ clientX, clientY }) => {
    
    const { onBoardStateChange, cardIndex, cardsSizes } = this.props;
    const xPosition = clientX + window.scrollX;
    const yPosition = clientY + window.scrollY;
    const draggedCardSizes = cardsSizes[cardIndex];

    // find index of hovered card
    const hoveredCardIndex = [...cardsSizes].findIndex(card => {
      const { left, top, width, height } = card;
      const isInsideHorizontally = xPosition >= left && xPosition <= left + width;
      const isInsideVertically = yPosition >= top && yPosition <= top + height;
      //return isInsideHorizontally && isInsideVertically;
      return isInsideHorizontally && isInsideVertically;
    });
    const hoveredCardSizes = this.getHoveredCardSizes(hoveredCardIndex);

    // set translated position of dragged card
    this.setState(prevState => ({
      translateX: xPosition - prevState.originalX,
      translateY: yPosition - prevState.originalY,
      isDragging: true,
    }));

    // set translation offsets of hovered card
    if (hoveredCardSizes) {;
      const offsetX = draggedCardSizes.left - hoveredCardSizes.left;
      const offsetY = draggedCardSizes.top - hoveredCardSizes.top;
  
      onBoardStateChange({
        hoveredOffsetX: offsetX,
        hoveredOffsetY: offsetY
      });
    }

    onBoardStateChange({
      isDraggingMode: true,
      draggedCardIndex: cardIndex,
      hoveredCardIndex: cardIndex !== hoveredCardIndex ? hoveredCardIndex : -1
    });
  };
  
  handleMouseUp = () => {

    const {
      onBoardStateChange,
      draggedCardIndex,
      hoveredCardIndex,
      cardsSizes } = this.props;
    const delay = 30;    
    const draggedCardSizes = cardsSizes[draggedCardIndex];
    const hoveredCardSizes = this.getHoveredCardSizes(hoveredCardIndex);
      
    window.removeEventListener('mousemove', this.handleMouseMove);
    window.removeEventListener('mouseup', this.handleMouseUp);

    // if there is no other card hovered
    if (hoveredCardIndex < 0) {
      this.setState({
        originalX: 0,
        originalY: 0,
        translateX: 0,
        translateY: 0,
        isDragging: false
      });

    } else {

      const { onTaskOrderChange } = this.props;
      
      if (hoveredCardSizes) {
        const offsetX = hoveredCardSizes.left - draggedCardSizes.left;
        const offsetY = hoveredCardSizes.top - draggedCardSizes.top;

        const draggedOffsetX =  -1 * (offsetX - this.state.translateX);
        const draggedOffsetY = -1 * (offsetY - this.state.translateY);

        this.setState({
          originalX: 0,
          originalY: 0,
          translateX: draggedOffsetX,
          translateY: draggedOffsetY
        });
      }

      const timeoutId = setTimeout(() => {
        this.setState({
          translateX: 0,
          translateY: 0,
          isDragging: false
        });
        this.handleCardsSizes();
        clearTimeout(timeoutId);
      }, delay);
      
      onTaskOrderChange(draggedCardIndex, hoveredCardIndex);
    }

    onBoardStateChange({
      isDraggingMode: false
    });

    const timeoutId = setTimeout(() => {
      onBoardStateChange({
        draggedCardIndex: -1,
        hoveredCardIndex: -1
      });
      clearTimeout(timeoutId);
    }, delay);
  };

  render() {
    const {
      task,
      onTaskRemove,
      cardIndex,
      isDraggingMode,
      draggedCardIndex,
      hoveredCardIndex,
      hoveredOffsetX,
      hoveredOffsetY,
      onBoardStateChange,
      onTaskFinish,
      onTaskEdit
    } = this.props;

    const {
      isDragging,
      translateX,
      translateY,
    } = this.state;
    
    const cardStyle = cardIndex === hoveredCardIndex && isDraggingMode
    ? { transform: `translate(${hoveredOffsetX}px, ${hoveredOffsetY}px)` }
    : { transform: `translate(${translateX}px, ${translateY}px)` };

    const cardClass = classNames("Card", {
      "Card--dragged": isDragging,
      "Card--hovered": cardIndex === hoveredCardIndex && isDraggingMode,
      "Card--noTransition": isDragging ||
      (cardIndex === draggedCardIndex && hoveredCardIndex !== -1)
    });

    return (
      <div
        className={cardClass}
        style={cardStyle}
        ref={this.card}
        onMouseDown={this.handleMouseDown}
      >
        <Task
          task={task}
          id={task.id}
          onTaskRemove={onTaskRemove}
          onCardStateChange={this.handleStateChange}
          onBoardStateChange={onBoardStateChange}
          onTaskFinish={onTaskFinish}
          onTaskEdit={onTaskEdit}
        />
      </div>
    );
  }
}
export default Card;