const validateInput = (input, prop) => {
  const alert = document.querySelector(`.${input}__alert--js`);

  if (prop === 'name' ? !/\w/g.test(task[prop]) : !/\d/g.test(task[prop])) {
    alert.classList.add(`${input}__alert--visible`);
    return false;
  } else {
    alert.classList.remove(`${input}__alert--visible`);
    return 1;
  }
}

const slideSection = (e) => {

  switch(e.target) {

    case rightButton:
      if (validateInput('task', 'name')) {
        taskSection.className = 'task task--js slideOutLeft';
        timeSection.className = 'time time--js time--visible slideInRight';
      }
      break;

    case leftButton:
      timeSection.className = 'time time--js slideOutRight';
      taskSection.className = 'task task--js task--visible slideInLeft';
      break;

    case startButton:
      if (validateInput('time', 'time')) {
        timeSection.className = 'time time--js slideOutLeft';
        timerSection.className = 'timer timer--js timer--visible slideInRight';
      }
      break;

    case timerStop:
      timerSection.className = 'timer timer--js slideOutLeft';
      taskSection.className = 'task task--js task--visible slideInRight';
      break;
      
    default: false;
  }
}

const handleTaskName = (e) => {
  task.name = e.target.value;
  timerHeading.textContent = `"${task.name}"`;
}

const handleTaskTime = (e) => {
  task.time = e.target.value;
  console.log('taskTime', task.time);
}

const handleTaskBreakTime = (e) => {
  task.breakTime = e.target.value;
  console.log('taskBreakTime', task.breakTime);
}








//////////////////////////////////////////////////////////////////// VARIABLES 

const task = {
  name: "",
  time: "",
  breakTime: ""
};

// TASK
const taskSection = document.querySelector('.task--js');
const rightButton = document.querySelector('.task__button--js-right');
const taskInput = document.querySelector('.task__input--js');
// TIME
const timeSection = document.querySelector('.time--js');
const leftButton = document.querySelector('.time__button--js-left');
const startButton = document.querySelector('.time__start--js');
const timeInput = document.querySelector('.time__input--js-time');
const breakTimeInput = document.querySelector('.time__input--js-break-time');
// TIMER
const timerSection = document.querySelector('.timer--js');
const timerStop = document.querySelector('.timer__button--js-stop');
const timerHeading = document.querySelector('.timer__heading--js');

/////////////////////////////////////////////////////////////////////// EVENTS 

rightButton.addEventListener('click', slideSection);
leftButton.addEventListener('click', slideSection);
startButton.addEventListener('click', slideSection);
timerStop.addEventListener('click', slideSection);

taskInput.addEventListener('change', handleTaskName);
timeInput.addEventListener('change', handleTaskTime);
breakTimeInput.addEventListener('change', handleTaskBreakTime);