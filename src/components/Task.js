import React, { Component } from 'react';
import '../scss/Task.scss';

class Task extends Component {

  render() {
    return (
      <section className="Task">
        <h2 className="Task__heading">
          {this.props.state.taskName}
        </h2>
      </section>
    );
  }
}
export default Task;