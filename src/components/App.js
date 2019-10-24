import React from 'react';
import Task from './Task.js';
import Time from './Time.js';
import Timer from './Timer.js';
import StopTask from './StopTask.js';
import Outro from './Outro.js';
import '../scss/App.scss';

const App = () => {
  return (
    <div className="App">
      <h1 class="App__heading visuallyhidden">Task Timer App</h1>
      <Task />
      <Time />
      <Timer />
      <StopTask />
      <Outro />
    </div>
  );
}
export default App;