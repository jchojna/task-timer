import React, { Component } from 'react';
import classNames from 'classnames';
import Sidebar from './Sidebar';
import Creator from './Creator';
import Card from './Card/Card';
import CardPlaceholder from './CardPlaceholder';
import icons from 'assets/svg/icons.svg';
import styles from './board.module.scss';

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCreatorVisible: false,
      isPlaceholderVisible: false,
      isSidebarVisible: false,
      // cards
      isDraggingMode: false,
      cardsSizes: [],
      draggedCardIndex: -1,
      hoveredCardIndex: -1,
      hoveredOffsetX: 0,
      hoveredOffsetY: 0,
    };
  }

  componentDidMount = () => {
    window.addEventListener('resize', this.handleWindowResize);
  };

  componentWillUnmount = () => {
    window.removeEventListener('resize', this.handleWindowResize);
  };

  handleWindowResize = () => {
    this.setState({
      isPlaceholderVisible: false,
    });
  };

  handleStateChange = (object) => this.setState(object);

  handleSidebar = (e) => {
    this.setState((prevState) => ({
      isSidebarVisible: !prevState.isSidebarVisible,
    }));
  };

  handleSidebarQuit = ({ target }) => {
    if (/Board--sidebarMode/.test(target.className)) this.handleSidebar();
  };

  handleTaskRemove = (id) => {
    const { onTaskRemove } = this.props;
    onTaskRemove(id);
    this.setState({
      isPlaceholderVisible: false,
    });
  };

  handleNewTaskButton = () => {
    this.setState({
      isCreatorVisible: true,
      isPlaceholderVisible: false,
    });
  };

  render() {
    const {
      users,
      loggedUserId,
      onUserUpdate,
      onTaskOrderChange,
      onUserLogout,
      onUserRemove,
      onTaskFinish,
      onTaskEdit,
    } = this.props;

    const {
      isCreatorVisible,
      isSidebarVisible,
      isPlaceholderVisible,
      isDraggingMode,
      hoveredCardIndex,
      draggedCardIndex,
      hoveredOffsetX,
      hoveredOffsetY,
      cardsSizes,
    } = this.state;

    const { tasks } = users[loggedUserId];

    const boardClass = classNames(styles.container, {
      [styles['container--sidebarMode']]: isSidebarVisible,
    });

    const newTaskButtonClass = classNames(styles.newTaskButton, {
      [styles['newTaskButton--visible']]: !isCreatorVisible,
    });

    const creatorContainerClass = classNames(styles.creator, {
      [styles['creator--maximized']]: isCreatorVisible,
    });
    const boardLogoClass = classNames(styles.logo, {
      [styles['logo--visible']]: isSidebarVisible,
    });

    return (
      <section className={boardClass}>
        <header className={styles.header}>
          {/* TEXT LOGO */}
          <h2 className={boardLogoClass}>
            task<span className={styles['logo--color']}>Timer</span>
          </h2>

          {/* BURGER BUTTON */}
          <button className={styles.burger} onClick={this.handleSidebar}>
            <svg className={styles.svg} viewBox="0 0 100 100">
              <use href={`${icons}#burger`}></use>
            </svg>
          </button>
        </header>

        {/* SIDEBAR */}
        <Sidebar
          block="userEdit"
          isSidebarVisible={isSidebarVisible}
          users={users}
          loggedUserId={loggedUserId}
          onUserUpdate={onUserUpdate}
          onUserLogout={onUserLogout}
          onUserRemove={onUserRemove}
        />

        {/* TASK CARDS */}
        {tasks.map((task, index) => (
          <Card
            key={`card-${task.id}`}
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
            onTaskFinish={onTaskFinish}
            onTaskEdit={onTaskEdit}
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
          {isCreatorVisible ? (
            <Creator
              isVisible={isCreatorVisible}
              onBoardStateChange={this.handleStateChange}
              onTaskEdit={onTaskEdit}
            />
          ) : (
            <div className="empty"></div>
          )}
        </section>
      </section>
    );
  }
}
export default Board;
