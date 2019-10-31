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
    const { state } = this.props;
    const { taskNames, plannedTaskTimes, plannedBreakTimes } = state;

    return (
      <section className="Board">

        {/* TASK CARDS */}
        {taskNames.map((taskName, index) => (
          <Task
            taskName={taskName}
            taskTime={plannedTaskTimes[index]}
            breakTime={plannedBreakTimes[index]}
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