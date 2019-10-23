import React from 'react';
import Task from './Task';
import '../scss/App.scss';

const App = () => {
  return (
    <div className="App">
      <h1 class="App__heading visuallyhidden">Task Timer App</h1>
      <Task />
    </div>
  );
}

export default App;