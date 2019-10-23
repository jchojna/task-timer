import React from 'react';
import Task from './Task';
import Time from './Time';
import '../scss/App.scss';

const App = () => {
  return (
    <div className="App">
      <h1 class="App__heading visuallyhidden">Task Timer App</h1>
      <Task />
      <Time />
    </div>
  );
}

export default App;