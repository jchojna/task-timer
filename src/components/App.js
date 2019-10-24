import React from 'react';
import Task from './Task';
import Time from './Time';
import Timer from './Timer';
import StopTask from './StopTask';
import '../scss/App.scss';

const App = () => {
  return (
    <div className="App">
      <h1 class="App__heading visuallyhidden">Task Timer App</h1>
      <Task />
      <Time />
      <Timer />
      <StopTask />
    </div>
  );
}

export default App;