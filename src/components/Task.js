import React, { Component } from 'react';
import '../scss/Task.scss';

class Task extends Component {

  render() {
    return (
      <section className="Task">
        <h2 className="Task__name">
          {this.props.taskName}
        </h2>
        <p className="Task__totalTaskTime">
          {}
        </p>
        <p className="Task__totalBreakTime">
          {}
        </p>

        <p>{this.props.plannedTaskTime}</p>
        <p>{this.props.plannedBreakTime}</p>
      </section>
    );
  }
}
export default Task;