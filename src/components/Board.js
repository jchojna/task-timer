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
    const {
      state,
      onTaskRemove,
      validateTaskName,
      onTimeChange,
      onTimeArrayChange
    } = this.props;
    const { tasks } = state;

    return (
      <section className="Board">

        {/* TASK CARDS */}
        {tasks.map((task) => (
          <Task
            task={task}
            id={task.dateCreated}
            key={task.dateCreated}
            onTaskRemove={onTaskRemove}
            validateTaskName={validateTaskName}
            onTimeChange={onTimeChange}
            onTimeArrayChange={onTimeArrayChange}
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