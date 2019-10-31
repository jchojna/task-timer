import React, { Component } from 'react';
import '../scss/Task.scss';

class Task extends Component {

  render() {
    return (
      <section className="Task">
        <h2 className="Task__heading">
          {this.props.taskName}
        </h2>
        <p>
          {this.props.plannedTaskTime}
        </p>
        <p>
          {this.props.plannedBreakTime}
        </p>
      </section>
    );
  }
}
export default Task;