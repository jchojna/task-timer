const slideSection = (e) => {

  switch(e.target) {

    case rightButton:
      if (taskName.length === 0) {
        taskAlert.classList.add('task__alert--visible');
        break;
      } else {
        taskAlert.classList.remove('task__alert--visible');
      }
      taskSection.className = 'task task--js slideOutLeft';
      timeSection.className = 'time time--js time--visible slideInRight';
      break;

    case leftButton:
      timeSection.className = 'time time--js slideOutRight';
      taskSection.className = 'task task--js task--visible slideInLeft';
      break;

    case startButton:
      timeSection.className = 'time time--js slideOutLeft';
      timerSection.className = 'timer timer--js timer--visible slideInRight';
      break;

    case timerStop:
      timerSection.className = 'timer timer--js slideOutLeft';
      taskSection.className = 'task task--js task--visible slideInRight';
      break;
      
    default: false;
  }
}

const handleTaskName = (e) => {
  taskName = e.target.value;
  timerHeading.textContent = `"${taskName}"`;
  console.log('taskName', taskName);
}

const handleTaskTime = (e) => {
  taskTime = e.target.value;
  console.log('taskTime', taskTime);
}

const handleTaskBreakTime = (e) => {
  taskBreakTime = e.target.value;
  console.log('taskBreakTime', taskBreakTime);
}








//////////////////////////////////////////////////////////////////// VARIABLES 
// TASK
const taskSection = document.querySelector('.task--js');
const rightButton = document.querySelector('.task__button--js-right');
const taskInput = document.querySelector('.task__input--js');
const taskAlert = document.querySelector('.task__alert--js');
let taskName = "";
// TIME
const timeSection = document.querySelector('.time--js');
const leftButton = document.querySelector('.time__button--js-left');
const startButton = document.querySelector('.time__start--js');
const timeInput = document.querySelector('.time__input--js-time');
const breakTimeInput = document.querySelector('.time__input--js-break-time');
let taskTime = "";
let taskBreakTime = "";
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