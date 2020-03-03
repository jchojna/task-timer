import React, { Component } from 'react';
import classNames from 'classnames';
import Sidebar from './Sidebar';
import Creator from './Creator';
import Card from './Card';
import CardPlaceholder from './CardPlaceholder';
import icons from '../assets/svg/icons.svg';
import '../scss/Board.scss';

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCreatorVisible: false,
      isPlaceholderVisible: false,
      isSidebarVisible: false,
      isDraggingMode: false,
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

  handleSidebar = () => {
    this.setState(prevState => ({
      isSidebarVisible: !prevState.isSidebarVisible
    }));
  }

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
      isSidebarVisible,
      isPlaceholderVisible,
      isDraggingMode,
      hoveredCardIndex,
      draggedCardIndex,
      hoveredOffsetX,
      hoveredOffsetY,
      cardsSizes
    } = this.state;

    const boardClass = classNames('Board', {
      'Board--sidebarMode': isSidebarVisible
    });

    const newTaskButtonClass = classNames('Board__newTaskButton', {
      'Board__newTaskButton--visible': !isCreatorVisible
    });

    const creatorContainerClass = classNames('Board__creator', {
      'Board__creator--maximized': isCreatorVisible
    });

    const sidebarClass = classNames('Sidebar', {
      'Sidebar--visible': isSidebarVisible
    })

    return (
      <section className={boardClass}>
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

        {/* BURGER BUTTON */}
        <button className="burgerBtn" onClick={this.handleSidebar}>
          <svg className="burgerBtn__svg" viewBox="0 0 100 100">
            <use href={`${icons}#burger`}></use>
          </svg>
        </button>

        {/* SIDEBAR */}
        <Sidebar
          className={sidebarClass}
        />
      </section>
    );
  }
}
export default Board;