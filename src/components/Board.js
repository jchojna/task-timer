import React, { Component } from 'react';
import Task from './Task.js';
import '../scss/Board.scss';

class Board extends Component {

  render() {
    return (
      <section className="Board">
        <Task />
      </section>
    );
  }
}
export default Board;