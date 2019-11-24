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
      
      clientX: 0,
      clientY: 0,
    
      originalX: 0,
      originalY: 0,
    
      //translateX: this.props.cardOffsetX,
      //translateY: this.props.cardOffsetY
      translateX: 0,
      translateY: 0
    }
  };

  componentDidMount() {
    /* setTimeout(() => this.setState({
      translateX: 0,
      translateY: 0
    }), 1); */
  }

  componentWillUnmount() {
    window.removeEventListener('mousemove', this.handleMouseMove);
    window.removeEventListener('mouseup', this.handleMouseUp);
  }

  handleCardCollision = (x, y) => {
    const { dragIndex, onCardDrop, onTaskOrderChange } = this.props;
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
        //onCardDrop(dropIndex, offsetX, offsetY);

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

        // timeout
        setTimeout(() => {
          onTaskOrderChange(dragIndex, dropIndex);
        }, 300);
        
        //onTaskOrderChange(dragIndex, dropIndex);
      }
    });
  }

  handleDrag = (x, y) => {
    const { dragIndex } = this.props;
    const { cardsSizes } = this.state;

    return [...cardsSizes].forEach((card, dropIndex) => {
      const { height, width, left, top } = card;
      if (x >= left && x <= left + width && y >= top && y <= top + height) {

        if (dragIndex === dropIndex) return;

        // do something
      }
    });
  }

  handleMouseDown = ({ clientX, clientY }) => {
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
      translateX: clientX - prevState.originalX,
      translateY: clientY - prevState.originalY,
    }),
    () => {
      if (onDrag) {
        onDrag({
          translateX: this.state.translateX,
          translateY: this.state.translateY
        });
      }
    });
    this.handleDrag(clientX, clientY);
  };










  handleMouseUp = ({ clientX, clientY }) => {
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
    this.handleCardCollision(clientX, clientY);













  };

  render() {
    const { children, cardOffsetX, cardOffsetY  } = this.props;
    const { isDragging, translateX, translateY} = this.state;


    const draggableStyle = {
      transform: `
        translate(${translateX + cardOffsetX}px, ${translateY + cardOffsetY}px)
      `
    }

    const draggableClass = classNames("Draggable", {
      "Draggable--dragging": isDragging
    });

    return (
      <div
        className={draggableClass}
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