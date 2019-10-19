class Task {
  constructor(time) {
    this.name = "",
    this.time = time,
    this.breakTime = time,
    this.timeElapsed = time,
    this.timeRemaining = time
  }

  get timeElapsed() {
    return this._timeElapsed;
  }
  set timeElapsed(time) {
    this._timeElapsed = [
      makeTwoDigits(Math.floor(time / 6000)),
      makeTwoDigits(time % 6000 / 100),
      makeTwoDigits(time % 100),
    ];
  }
  get timeRemaining() {
    return this._timeRemaining;
  }
  set timeRemaining(time) {
    this._timeRemaining = [
      makeTwoDigits(Math.floor(time / 6000)),
      makeTwoDigits(time % 6000 / 100),
      makeTwoDigits(time % 100),
    ];
  }
}

const makeTwoDigits = (number) => {
  return number < 10 ? `0${number}` : number;
}

const validateInput = (input, prop) => {
  const alert = document.querySelector(`.${input}__alert--js`);

  if (prop === 'name' ? !/\w/g.test(task[prop]) : !/\d/g.test(task[prop])) {
    alert.classList.add(`${input}__alert--visible`);
    return false;
  } else if (timeInput.validity.valid && breakTimeInput.validity.valid) {
    alert.classList.remove(`${input}__alert--visible`);
    return 1;
  } else {
    return false;
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
  console.log(task);
}

const handleTaskTime = (e) => {
  const {target} = e;
  const time = target.value.split(/[\s:.]/).map(a => parseInt(a));
  const timeInCSeconds = time[0] * 6000 + (time[1] ? time[1] * 100 : 0);
  if (target === timeInput) {
    task.time = timeInCSeconds;
    task.timeRemaining = timeInCSeconds;
    const [min, sec, cSec] = task.timeRemaining;
    remainingMin.textContent = min;
    remainingSec.textContent = sec;
    remainingCSec.textContent = cSec;
  } else {
    task.breakTime = timeInCSeconds;
  }
  console.log(task);

}

//////////////////////////////////////////////////////////////////// VARIABLES 

const task = new Task(0);

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
const displayElapsed = document.querySelector('.display__elapsed--js');
const displayRemaining = document.querySelector('.display__remaining--js');

const remainingMin = document.querySelector('.display__remaining--js .display__time--js-min');
const remainingSec = document.querySelector('.display__remaining--js .display__time--js-sec');
const remainingCSec = document.querySelector('.display__remaining--js .display__time--js-cSec');

/////////////////////////////////////////////////////////////////////// EVENTS 

rightButton.addEventListener('click', slideSection);
leftButton.addEventListener('click', slideSection);
startButton.addEventListener('click', slideSection);
timerStop.addEventListener('click', slideSection);

taskInput.addEventListener('change', handleTaskName);
timeInput.addEventListener('change', handleTaskTime);
breakTimeInput.addEventListener('change', handleTaskTime);