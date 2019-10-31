import React, { Component } from 'react';
import '../scss/Task.scss';

class Task extends Component {

  render() {
    return (
      <section className="Task">
        <h2 className="Task__heading">
          {this.props.state.taskNames}
        </h2>
        <p>
          {this.props.state.plannedTaskTimes}
        </p>
        <p>
          {this.props.state.plannedBreakTimes}
        </p>
        <p>
          {this.props.state.totalTaskTimes}
        </p>
        <p>
          {this.props.state.totalBreakTimes}
        </p>
      </section>
    );
  }
}
export default Task;