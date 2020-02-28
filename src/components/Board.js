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
      tasks: [
        {
          taskName: "Add some feature to TaskTimer App",
          taskMinutes: 20,
          taskSeconds: 0,
          breakMinutes: 5,
          breakSeconds: 0,
          totalTaskTime: 2000000,
          totalBreakTime: 500000,
          totalTaskTimeArray: ["20","00","00"],
          totalBreakTimeArray: ["05","00","00"],
          id: 56436543654,
          dateCreated: 56436543654
        },
        {
          taskName: "Do exercices",
          taskMinutes: 0,
          taskSeconds: 1,
          breakMinutes: 0,
          breakSeconds: 1,
          totalTaskTime: 1000,
          totalBreakTime: 1000,
          totalTaskTimeArray: ["00","01","00"],
          totalBreakTimeArray: ["00","01","00"],
          id: 6546567854,
          dateCreated: 6546567854
        },
        {
          taskName: "Test task for preview purposes",
          taskMinutes: 30,
          taskSeconds: 0,
          breakMinutes: 10,
          breakSeconds: 0,
          totalTaskTime: 500000,
          totalBreakTime: 100000,
          totalTaskTimeArray: ["05","00","00"],
          totalBreakTimeArray: ["01","00","00"],
          id: 90798758576,
          dateCreated: 90798758576
        },
        {
          taskName: "Another task for testing",
          taskMinutes: 0,
          taskSeconds: 1,
          breakMinutes: 0,
          breakSeconds: 1,
          totalTaskTime: 1000,
          totalBreakTime: 1000,
          totalTaskTimeArray: ["00","01","00"],
          totalBreakTimeArray: ["00","01","00"],
          id: 654765387657985,
          dateCreated: 654765387657985
        }
      ],
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

  handleTaskOrder = (dragIndex, dropIndex) => {
    const { tasks } = this.state;
    this.setState(prevState => {
      const newTasks = [...prevState.tasks];
      newTasks.splice(dragIndex, 1, tasks[dropIndex]);
      newTasks.splice(dropIndex, 1, tasks[dragIndex]);
      return { tasks: newTasks };
    });
  };
  
  handleTaskRemove = (id) => this.setState(prevState => ({
    tasks: prevState.tasks.filter(task => task.id !== id),
    isPlaceholderVisible: false
  }));
  
  handleNewTaskButton = () => {
    this.setState({
      isCreatorVisible: true,
      isPlaceholderVisible: false
    });
  }

  render() {
    const {
      isCreatorVisible,
      tasks,
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
            onTaskOrderChange={this.handleTaskOrder}
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