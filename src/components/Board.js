import React, { Component } from 'react';
import Task from './Task.js';
import '../scss/Board.scss';

class Board extends Component {

  render() {
    const { 
      state
    } = this.props;

    return (
      <section className="Board">
        <Task
          state={state}
        />
      </section>
    );
  }
}
export default Board;