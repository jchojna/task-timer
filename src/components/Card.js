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

  handleMouseDown = ({ clientX, clientY }) => {
    if (this.state.isFixed) return;

    const { onAppStateChange } = this.props;

    window.addEventListener('mousemove', this.handleMouseMove);
    window.addEventListener('mouseup', this.handleMouseUp);

    // get array of objects containing each card size and offset
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
      
    this.setState({
      originalX: clientX + window.scrollX,
      originalY: clientY + window.scrollY
    });

    onAppStateChange({ cardsSizes });
  };




  handleMouseMove = ({ clientX, clientY }) => {
    if (this.state.isFixed) return;
    
    const { onAppStateChange, cardIndex, cardsSizes } = this.props;
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

    const hoveredCardSizes = hoveredCardIndex >= 0
    ? hoveredCardIndex !== cardIndex
      ? cardsSizes[hoveredCardIndex]
      : null
    : null; 

    // set translated position of dragged card
    this.setState(prevState => ({
      translateX: xPosition - prevState.originalX,
      translateY: yPosition - prevState.originalY,
      isDragging: true,
    }));

    // set translation offsets of hovered card
    if (hoveredCardSizes) {
      const offsetX = draggedCardSizes.left - hoveredCardSizes.left;
      const offsetY = draggedCardSizes.top - hoveredCardSizes.top;
  
      onAppStateChange({
        hoveredOffsetX: offsetX,
        hoveredOffsetY: offsetY
      });
    }

    onAppStateChange({
      isDraggingMode: true,
      draggedCardIndex: cardIndex,
      hoveredCardIndex: cardIndex !== hoveredCardIndex ? hoveredCardIndex : -1
    });
  };





  
  handleMouseUp = () => {
    if (this.state.isFixed) return false;

    const {
      onAppStateChange,
      draggedCardIndex,
      hoveredCardIndex } = this.props;
      
    window.removeEventListener('mousemove', this.handleMouseMove);
    window.removeEventListener('mouseup', this.handleMouseUp);

    if (hoveredCardIndex === -1) {
      this.setState({
        originalX: 0,
        originalY: 0,
        translateX: 0,
        translateY: 0,
        isDragging: false
      });

    } else {
      /* const { onTaskOrderChange, cardsSizes } = this.props;
      const draggedCard = cardsSizes[draggedCardIndex];
      const hoveredCard = cardsSizes[draggedCardIndex];

      const draggedOffsetX =  -1 * (hoveredCard.left - draggedCard.left - this.state.translateX);
      const draggedOffsetY = -1 * (hoveredCard.top - draggedCard.top - this.state.translateY);

      this.setState({
        originalX: 0,
        originalY: 0,
        translateX: draggedOffsetX,
        translateY: draggedOffsetY
      });

      setTimeout(() => {
        this.setState({
          translateX: 0,
          translateY: 0,
          isDragging: false
        });
      }, 30);

      onTaskOrderChange(draggedCardIndex, hoveredCardIndex); */
    }
    onAppStateChange({
      isDraggingMode: false,
    });
  };

  /* handleMouseOver = () => {
    const {
      isDraggingMode,
      cardsSizes,
      cardIndex,
      lastDraggedCardIndex,
      onAppStateChange
    } = this.props;

    if (!isDraggingMode) return;
    if (this.state.isDragging || this.state.isFixed) return;

    const hoveredCard = cardsSizes[cardIndex];
    const draggedCard = cardsSizes[lastDraggedCardIndex];
    
    const offsetX = draggedCard.left - hoveredCard.left;
    const offsetY = draggedCard.top - hoveredCard.top;

    onAppStateChange({
      lastHoveredCardIndex: cardIndex,
      hoveredOffsetX: offsetX,
      hoveredOffsetY: offsetY
    });
  } */
  
  /* handleMouseOut = () => {
    const { isDraggingMode, onAppStateChange } = this.props;
    if (isDraggingMode) {
      onAppStateChange({
        hoveredCardIndex: null,
        hoveredOffsetX: 0,
        hoveredOffsetY: 0
      });
    }
  } */

  render() {
    const {
      task,
      onTaskRemove,
      cardIndex,
      isDraggingMode,
      hoveredCardIndex,
      hoveredOffsetX,
      hoveredOffsetY
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
      "Card--noTransition": isDragging
    });

    return (
      <div
        className={cardClass}
        style={cardStyle}
        ref={this.card}
        /* onMouseOut={this.handleMouseOut} */
        onMouseDown={this.handleMouseDown}
      >
        <Task
          task={task}
          id={task.dateCreated}
          key={task.dateCreated}
          onTaskRemove={onTaskRemove}
          onDraggableStateChange={this.handleStateChange}
        />
      </div>
    );
  }
}
export default Card;