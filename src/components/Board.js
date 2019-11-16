import React, { Component } from 'react';
import Task from './Task.js';
import Creator from './Creator.js';
import '../scss/Board.scss';

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCreatorVisible: false
    }
  }

  handleStateChange = (object) => this.setState(object);

  handleCreateNewTaskButton = () => {
    this.setState({ isCreatorVisible: true });
  }

  render() {
    const { state, onTaskRemove } = this.props;

    const { tasks } = state;

    const { isCreatorVisible } = this.state;

    return (
      <section className="Board">

        {/* TASK CARDS */}
        {tasks.map((task) => (
          <Task
            task={task}
            id={task.dateCreated}
            key={task.dateCreated}
            onTaskRemove={onTaskRemove}
          />
        ))}

        {/* ADD NEW TASK BUTTON */}
        <button
          className="button Board__createTask"
          onClick={this.handleCreateNewTaskButton}
        >
          Add New Task
        </button>

        {/* TASK CREATOR */}
        <Creator
          compClassName={isCreatorVisible
            ? "Creator--visible slideInRight" : "slideOutLeft"}
          onBoardStateChange={this.handleStateChange}
          //onTimeChange={handleTimeChange}
          //validateTaskName={validateTaskName}
        />
      </section>
    );
  }
}
export default Board;