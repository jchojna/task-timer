class Task {
  constructor(time) {
    this.name = "",
    this.timeElapsed = 0,
    this.timeRemaining = time,
    this.previousTime = 0,
    this.breakTime = time,
    this.isRunning = false,
    this.isBreak = false
  }

  get timeElapsedArray() {
    return this._timeElapsedArray;
  }
  set timeElapsedArray(time) {
    this._timeElapsedArray = [
      makeTwoDigits(Math.floor(time / 60000)),
      makeTwoDigits(Math.floor(time / 1000 % 60)),
      makeTwoDigits(Math.floor(time / 10 % 100))
    ];
  }
  get timeRemainingArray() {
    return this._timeRemainingArray;
  }
  set timeRemainingArray(time) {
    this._timeRemainingArray = [
      makeTwoDigits(Math.floor(time / 60000)),
      makeTwoDigits(Math.floor(time / 1000 % 60)),
      makeTwoDigits(Math.floor(time / 10 % 100))
    ];
  }
}

const countdown = () => {
  if (task.isRunning) {
    let {
      timeElapsed,
      timeRemaining,
      timeTotal,
      previousTime
    } = task;
    
    if (timeElapsed >= timeTotal) {
      task.timeElapsed, timeElapsed = timeTotal;
      task.timeRemaining, timeRemaining = 0;
      task.isRunning = false;
      clearInterval(intervalId);

    } else {
      const now = Date.now();
      task.timeElapsed = now - previousTime;
    }

    task.timeRemaining = timeTotal - timeElapsed;
    task.timeElapsedArray = timeElapsed;
    task.timeRemainingArray = timeRemaining;


    const [eMin, eSec, eCSec] = task.timeElapsedArray;
    elapsedMin.textContent = eMin;
    elapsedSec.textContent = eSec;
    elapsedCSec.textContent = eCSec;

    const [rMin, rSec, rCSec] = task.timeRemainingArray;
    remainingMin.textContent = rMin;
    remainingSec.textContent = rSec;
    remainingCSec.textContent = rCSec;

    const percentLoaded = timeElapsed / timeTotal * 100;
    progressLoadedPercent.textContent = `${Math.round(percentLoaded)} %`;
    progressLoadedBar.style.width = `${percentLoaded}%`;
    
    const percentRemaining = task.timeRemaining / task.timeTotal * 100;
    progressRemainingPercent.textContent = `${Math.round(percentRemaining)} %`;
    progressRemainingBar.style.width = `${percentRemaining}%`;
    
    if (timeElapsed >= timeTotal) {
      console.log('now');
      task.isRunning = false;
      clearInterval(intervalId);
      return false;

    }
  }
}

const setTotalTime = () => {
  let time = timeInput.value.split(/[mM]/).map(a => parseInt(a) || 0);
  time = time.length > 1 ? time : [0, ...time];
  const [minutes, seconds] = time;
  return minutes * 60000 + seconds * 1000;
}

const slideSection = (e) => {

  switch(e.target) {

    case rightButton:
      if (validateInput('task')) {
        taskSection.className = 'task task--js slideOutLeft';
        timeSection.className = 'time time--js time--visible slideInRight';
        task.name = taskInput.value;
        timerHeading.textContent = `"${task.name}"`;
      }
      break;

    case leftButton:
      timeSection.className = 'time time--js slideOutRight';
      taskSection.className = 'task task--js task--visible slideInLeft';
      break;

    case startButton:
      if (validateInput('time') && !startButton.disable) {
        /* timeSection.className = 'time time--js slideOutLeft';
        timerSection.className = 'timer timer--js timer--visible slideInRight'; */
        task.isRunning = true;
        task.previousTime = Date.now();
        task.timeTotal = setTotalTime();
        if (task.timeTotal <= 0) return;
        task.timeElapsed = 0;
        intervalId = setInterval(() => countdown(), 10);
        startButton.disable = true;
        startButton.classList.add('time__start--disabled');
      }
      break;

    case timerStop:
      /* timerSection.className = 'timer timer--js slideOutLeft';
      taskSection.className = 'task task--js task--visible slideInRight'; */
      task.isRunning = false;
      startButton.disable = false;
      startButton.classList.remove('time__start--disabled');
      clearInterval(intervalId);
      break;
      
    default: false;
  }
}

const makeTwoDigits = (number) => {
  return number < 10 ? `0${number}` : number;
}

const validateInput = (input) => {
  const alert = document.querySelector(`.${input}__alert--js`);

  if (input === 'task' ? !/\w/g.test(taskInput.value) : !/\d/g.test(timeInput.value)) {
    alert.classList.add(`${input}__alert--visible`);
    return false;
  } else if (timeInput.validity.valid && breakTimeInput.validity.valid) {
    alert.classList.remove(`${input}__alert--visible`);
    return 1;
  } else {
    return false;
  }
}

//////////////////////////////////////////////////////////////////// VARIABLES 

const task = new Task(0);
let intervalId = "";

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
// DISPLAY
const displayElapsed = document.querySelector('.display__elapsed--js');
const displayRemaining = document.querySelector('.display__remaining--js');
const remainingMin = document.querySelector('.display__remaining--js .display__time--js-min');
const remainingSec = document.querySelector('.display__remaining--js .display__time--js-sec');
const remainingCSec = document.querySelector('.display__remaining--js .display__time--js-cSec');
const elapsedMin = document.querySelector('.display__elapsed--js .display__time--js-min');
const elapsedSec = document.querySelector('.display__elapsed--js .display__time--js-sec');
const elapsedCSec = document.querySelector('.display__elapsed--js .display__time--js-cSec');
// PROGRESS BAR
const progressLoadedPercent = document.querySelector('.progress__percent--js-loaded');
const progressRemainingPercent = document.querySelector('.progress__percent--js-remaining');
const progressLoadedBar = document.querySelector('.progress__part--js-loaded');
const progressRemainingBar = document.querySelector('.progress__part--js-remaining');

/////////////////////////////////////////////////////////////////////// EVENTS 

rightButton.addEventListener('click', slideSection);
leftButton.addEventListener('click', slideSection);
startButton.addEventListener('click', slideSection);
timerStop.addEventListener('click', slideSection);