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
      isOnDropArea: false,
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

    //if (this.props.onDragStart) this.props.onDragStart();

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
    
    const { onDrag, onAppStateChange, cardIndex, cardsSizes } = this.props;

    this.setState(prevState => ({
      translateX: clientX + window.scrollX - prevState.originalX,
      translateY: clientY + window.scrollY - prevState.originalY,
      isDragging: true,
    })/* ,
    () => {
      if (onDrag) {
        onDrag({
          translateX: this.state.translateX,
          translateY: this.state.translateY
        });
      }
    } */);

    const hoveredCard = [...cardsSizes].findIndex((card, index) => {
      const { left, top, width, height } = card;
      const xPosition = clientX + window.scrollX;
      const yPosition = clientY + window.scrollY;
      const isInsideHorizontally = xPosition >= left && xPosition <= left + width;
      const isInsideVertically = yPosition >= top && yPosition <= top + height;

      return isInsideHorizontally && isInsideVertically;
    });

    console.log('hoveredCard', hoveredCard);





    onAppStateChange({
      isDraggingMode: true,
      lastDraggedCardIndex: cardIndex,
      //lastHoveredCardIndex: hoveredCard
    });
  };





  
  handleMouseUp = () => {
    if (this.state.isFixed) return false;

    const {
      onAppStateChange,
      lastDraggedCardIndex,
      lastHoveredCardIndex } = this.props;
      
    window.removeEventListener('mousemove', this.handleMouseMove);
    window.removeEventListener('mouseup', this.handleMouseUp);

    if (lastHoveredCardIndex === null) {
      this.setState({
        originalX: 0,
        originalY: 0,
        translateX: 0,
        translateY: 0,
        isDragging: false
      }/* ,
      () => {
        if (this.props.onDragEnd) {
          this.props.onDragEnd();
        }
      } */);

    } else {
      const { onTaskOrderChange, cardsSizes } = this.props;
      const draggedCard = cardsSizes[lastDraggedCardIndex];
      const hoveredCard = cardsSizes[lastHoveredCardIndex];

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

      onTaskOrderChange(lastDraggedCardIndex, lastHoveredCardIndex);
    }
    onAppStateChange({
      isDraggingMode: false,
    });
  };

  handleMouseOver = () => {
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
  }
  
  handleMouseOut = () => {
    const { isDraggingMode, onAppStateChange } = this.props;
    if (isDraggingMode) {
      onAppStateChange({
        lastHoveredCardIndex: null,
        hoveredOffsetX: 0,
        hoveredOffsetY: 0
      });
    }
  }

  render() {
    const {
      task,
      onTaskRemove,
      cardIndex,
      isDraggingMode,
      lastHoveredCardIndex,
      hoveredOffsetX,
      hoveredOffsetY
    } = this.props;

    const {
      isDragging,
      translateX,
      translateY,
    } = this.state;
    
    const draggableStyle =
    
      cardIndex === lastHoveredCardIndex && isDraggingMode
      ? {
        transform: `translate(${hoveredOffsetX}px, ${hoveredOffsetY}px)`
      }
      : {
        transform: `translate(${translateX}px, ${translateY}px)`
      }
      ;

    const cardClass = classNames("Card", {
      "Card--top": isDragging
    });

    const draggableContainerClass = classNames("Card__draggable", {
      "Card__draggable--dragging": isDragging,
      "Card__draggable--hovered": cardIndex === lastHoveredCardIndex && isDraggingMode,
      "Card__draggable--noTransition": isDragging || !isDraggingMode
    });

    return (
      <div
        className={cardClass}
        ref={this.card}
        /* onMouseOver={this.handleMouseOver} */
        onMouseOut={this.handleMouseOut}
      >
        <div
          className={draggableContainerClass}
          style={draggableStyle}
          ref={this.draggable}
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
      </div>
    );
  }
}
export default Card;