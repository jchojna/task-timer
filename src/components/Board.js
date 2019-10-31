import React, { Component } from 'react';
import Task from './Task.js';
import '../scss/Board.scss';

class Board extends Component {

  handleCreateNewTaskButton = () => {
    const { onStateChange } = this.props;
    onStateChange({
      isCreatorVisible: true
    });
  }

  render() {
    const { state, handleTotalTime } = this.props;
    const { tasks } = state;

    return (
      <section className="Board">

        {/* TASK CARDS */}
        {tasks.map((task) => (
          <Task
            taskName={task.taskName}
            plannedTaskTime={task.plannedTaskTime}
            plannedBreakTime={task.plannedBreakTime}
            handleTotalTime={handleTotalTime}
          />
        ))}

        {/* ADD NEW TASK BUTTON */}
        <button
          className="button Board__createButton"
          onClick={this.handleCreateNewTaskButton}
        >
          +
        </button>
      </section>
    );
  }
}
export default Board;