import React, { Component } from 'react';
import classNames from 'classnames';
import Creator from './Creator';
import Card from './Card';
import CardPlaceholder from './CardPlaceholder';
import '../scss/Board.scss';

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCreatorVisible: false,
      isDraggingMode: false,
      isPlaceholderVisible: false,
      // cards
      cardsSizes: [],
      draggedCardIndex: -1,
      hoveredCardIndex: -1,
      hoveredOffsetX: 0,
      hoveredOffsetY: 0,
      noTransitionMode: false,
      // validity
      isTaskNameValid: false,
      isTimeInputValid: false
    };
  }

  componentDidMount = () => {
    window.addEventListener('resize', this.handleWindowResize);
    //this.setState({ tasks: this.props.loggedUser.tasks });
  }

  componentWillUnmount = () => {
    window.removeEventListener('resize', this.handleWindowResize);
  }

  handleWindowResize = () => {
    this.setState({
      isPlaceholderVisible: false
    });
  }

  handleStateChange = (object) => this.setState(object);

  handleTaskRemove = (id) => {
    const { onTaskRemove } = this.props;
    onTaskRemove(id);
    this.setState({
      isPlaceholderVisible: false
    });
  }
  
  handleNewTaskButton = () => {
    this.setState({
      isCreatorVisible: true,
      isPlaceholderVisible: false
    });
  }

  render() {
    const { loggedUserLogin, users, onTaskOrderChange } = this.props;
    const tasks = [...users].find(user => user.login === loggedUserLogin).tasks;

    const {
      isCreatorVisible,
      isDraggingMode,
      isPlaceholderVisible,
      hoveredCardIndex,
      draggedCardIndex,
      hoveredOffsetX,
      hoveredOffsetY,
      cardsSizes
    } = this.state;

    const newTaskButtonClass = classNames("Board__newTaskButton", {
      "Board__newTaskButton--visible": !isCreatorVisible
    });

    const creatorContainerClass = classNames("Board__creator", {
      "Board__creator--maximized": isCreatorVisible
    });

    return (
      <section className="Board">
        {/* TASK CARDS */}
        {tasks.map((task, index) => (
          <Card
            key={`card-${task.dateCreated}`}
            task={task}
            cardIndex={index}
            onTaskOrderChange={onTaskOrderChange}
            onBoardStateChange={this.handleStateChange}
            onTaskRemove={this.handleTaskRemove}
            isDraggingMode={isDraggingMode}
            hoveredCardIndex={hoveredCardIndex}
            draggedCardIndex={draggedCardIndex}
            hoveredOffsetX={hoveredOffsetX}
            hoveredOffsetY={hoveredOffsetY}
            cardsSizes={cardsSizes}
          />
        ))}

        {/* CARDS PLACEHOLDERS */}
        {tasks.map((task, index) => (
          <CardPlaceholder
            key={`placeholder-${index}`}
            placeholderIndex={index}
            cardsSizes={cardsSizes}
            isPlaceholderVisible={isPlaceholderVisible}
          />
        ))}

        {/* CREATE NEW TASK */}
        <section className={creatorContainerClass}>
          <button
            className={newTaskButtonClass}
            onClick={this.handleNewTaskButton}
          >
            Add New Task
          </button>
          {
            isCreatorVisible
            ? <Creator
                isVisible={isCreatorVisible}
                onBoardStateChange={this.handleStateChange}
              />
            : <div className="empty"></div>
          }
        </section>
      </section>
    );
  }
}
export default Board;