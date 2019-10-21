class Task {
  constructor(time) {
    this.name = "",
    this.timeElapsed = 0,
    this.timeRemaining = time,
    this.previousTime = 0,
    this.breakElapsed = 0,
    this.isRunning = false,
    this.isBreak = false
  }

  get timeElapsedArray() {
    return this._timeElapsedArray;
  }
  set timeElapsedArray(time) {                                 // ! TO REFACTOR
    this._timeElapsedArray = [
      makeTwoDigits(Math.floor(time / 60000)),
      makeTwoDigits(Math.floor(time / 1000 % 60)),
      makeTwoDigits(Math.floor(time / 10 % 100))
    ];
  }
  get timeRemainingArray() {
    return this._timeRemainingArray;
  }
  set timeRemainingArray(time) {                               // ! TO REFACTOR
    this._timeRemainingArray = [
      makeTwoDigits(Math.floor(time / 60000)),
      makeTwoDigits(Math.floor(time / 1000 % 60)),
      makeTwoDigits(Math.floor(time / 10 % 100))
    ];
  }
  get breakElapsedArray() {
    return this._breakElapsedArray;
  }
  set breakElapsedArray(time) {                                 // ! TO REFACTOR
    this._breakElapsedArray = [
      makeTwoDigits(Math.floor(time / 60000)),
      makeTwoDigits(Math.floor(time / 1000 % 60)),
      makeTwoDigits(Math.floor(time / 10 % 100))
    ];
  }
}
// F0 ////////////////////////////////////////////////////////////// COUNTDOWN 

const countdown = () => {
  if (task.isRunning) {
    let {
      timeElapsed,
      timeRemaining,
      timeTotal,
      previousTime
    } = task;
    
    // when countdown finishes
    if (timeElapsed >= timeTotal) {
      task.timeElapsed, timeElapsed = timeTotal;
      task.timeRemaining, timeRemaining = 0;
      task.isRunning = false;
      startButton.disable = false;
      startButton.classList.remove('time__start--disabled');
      togglePlayPauseButton('play');
      stopSection.removeEventListener('click', handleStopConfirm);
      stopSection.classList.contains('stop--visible') ? toggleStopConfirm() : false;
      timerStop.removeEventListener('click', handleButtons);
      timerPlayPause.removeEventListener('click', handleButtons);
      timerToggle.removeEventListener('click', handleTimerToggle);
      clearInterval(intervalWorkId);
      clearInterval(intervalBreakId);
      handleOutro();

    } else {
      const now = Date.now();
      task.previousTime = now;
      task.timeElapsed = timeElapsed + (now - previousTime);
    }

    task.timeRemaining = timeTotal - timeElapsed;
    task.timeElapsedArray = timeElapsed;
    task.timeRemainingArray = timeRemaining;

    const [eMin, eSec, eCSec] = task.timeElapsedArray;                             // ! TO REFACTOR
    elapsedMin.textContent = eMin;
    elapsedSec.textContent = eSec;
    elapsedCSec.textContent = eCSec;

    const [rMin, rSec, rCSec] = task.timeRemainingArray;                           // ! TO REFACTOR
    remainingMin.textContent = rMin;
    remainingSec.textContent = rSec;
    remainingCSec.textContent = rCSec;

    const percentElapsed = timeElapsed / timeTotal * 100;                           // ! TO REFACTOR
    progressPercentElapsed.textContent = `${Math.round(percentElapsed)} %`;
    progressBarElapsed.style.width = `${percentElapsed}%`;
    
    const percentRemaining = task.timeRemaining / task.timeTotal * 100;            // ! TO REFACTOR
    progressPercentRemaining.textContent = `${Math.round(percentRemaining)} %`;
    progressBarRemaining.style.width = `${percentRemaining}%`;
  }
}

const breakTime = () => {
  if (task.isBreak) {
    const {
      previousTime,
      breakElapsed
    } = task;

    const now = Date.now();
    task.previousTime = now;
    task.breakElapsed = breakElapsed + (now - previousTime);

    task.breakElapsedArray = task.breakElapsed;
    const [bMin, bSec, bCSec] = task.breakElapsedArray;                           // ! TO REFACTOR
    breakElapsedMin.textContent = bMin;
    breakElapsedSec.textContent = bSec;
    breakElapsedCSec.textContent = bCSec;
  }
}
// F0 /////////////////////////////////////////////////////// HANDLE TASK TIME 

const setTotalTime = () => {
  let time = timeInput.value.split(/[mM]/).map(a => parseInt(a) || 0);
  time = time.length > 1 ? time : [0, ...time];
  const [minutes, seconds] = time;
  return minutes * 60000 + seconds * 1000;
}

const handleButtons = (e) => {

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
        timeSection.className = 'time time--js slideOutLeft';
        timerSection.className = 'timer timer--js timer--visible slideInRight';
        task.isRunning = true;
        task.previousTime = Date.now();
        task.timeTotal = setTotalTime();
        if (task.timeTotal <= 0) return;
        task.timeElapsed = 0;
        intervalWorkId = setInterval(() => countdown(), 10);
        startButton.disable = true;
        startButton.classList.add('time__start--disabled');
        task.totalBreaks = 0;
        task.breakElapsed = 0;
        task.breakElapsedArray = task.breakElapsed;
        const [bMin, bSec, bCSec] = task.breakElapsedArray;                           // ! TO REFACTOR
        breakElapsedMin.textContent = bMin;
        breakElapsedSec.textContent = bSec;
        breakElapsedCSec.textContent = bCSec;
        togglePlayPauseButton('pause');
        updateBreaksCounter();
        timerStop.addEventListener('click', handleButtons);
        timerPlayPause.addEventListener('click', handleButtons);
        timerToggle.addEventListener('click', handleTimerToggle);
      }
      break;

    case timerStop:
      toggleStopConfirm();
      stopSection.addEventListener('click', handleStopConfirm);
      break;

    case timerPlayPause:
      // enabling break mode
      if (task.isRunning) {
        togglePlayPauseButton('play');
        task.isRunning = false;
        task.isBreak = true;
        task.totalBreaks = task.totalBreaks + 1;
        updateBreaksCounter();
        intervalBreakId = setInterval(() => breakTime(), 10);
      // turning break mode off
      } else {
        togglePlayPauseButton('pause');
        clearInterval(intervalBreakId);
        task.isRunning = true;
        task.isBreak = false;
        task.previousTime = Date.now();
      }

      
    default: false;
  }
}

const handleStopConfirm = (e) => {
  switch (e.target) {

    case confirmStopButton:
      stopSection.removeEventListener('click', handleStopConfirm);
      task.isRunning = false;
      startButton.disable = false;
      startButton.classList.remove('time__start--disabled');
      togglePlayPauseButton('play');
      toggleStopConfirm();
      clearInterval(intervalWorkId);
      clearInterval(intervalBreakId);
      timerStop.removeEventListener('click', handleButtons);
      timerPlayPause.removeEventListener('click', handleButtons);
      timerToggle.removeEventListener('click', handleTimerToggle);
      timerSection.className = 'timer timer--js slideOutLeft';
      taskSection.className = 'task task--js task--visible slideInRight';
      break;  

    case cancelStopButton:
      toggleStopConfirm();
      break;
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

const updateBreaksCounter = () => {
  breaksCounter.textContent =
  `${task.totalBreaks} ${task.totalBreaks === 1 ? `break` : `breaks`}`;
}

const togglePlayPauseButton = (action) => {
  const opposite = action === 'play' ? 'pause' : 'play';
  const visibleSvg = document.querySelector(`.timer__svg--js-${action}`);
  const hiddenSvg = document.querySelector(`.timer__svg--js-${opposite}`);

  visibleSvg.classList.remove('timer__svg--hidden');
  hiddenSvg.classList.add('timer__svg--hidden');
}

const toggleStopConfirm = () => {
  stopSection.classList.toggle('stop--visible');
}

const handleTimerToggle = () => {
  [...display.children].forEach(item => {
    item.classList.toggle('display__container--visible');
    if (item.classList.contains('display__container--visible')) {
      item.classList.remove('display__container--hideUp')
      item.classList.add('display__container--showUp')
    } else {
      item.classList.remove('display__container--showUp');
      item.classList.add('display__container--hideUp');
    }
  });
  [...progressPercents].forEach(percent => {
    percent.classList.toggle('progress__percent--visible');
  });
  [...progressBar.children].forEach(part => {
    if (part.classList.contains('progress__part--loading')) {
      part.classList.remove('progress__part--loading');
      part.classList.add('progress__part--unloading');
    } else {
      part.classList.add('progress__part--loading');
      part.classList.remove('progress__part--unloading');
    }
  })
}

const handleOutro = () => {
  outroSection.classList.add('outro--visible');
}

//////////////////////////////////////////////////////////////////// VARIABLES 

const task = new Task(0);
let intervalWorkId = "";
let intervalBreakId = "";

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
const timerPlayPause = document.querySelector('.timer__button--js-playPause');
const timerStop = document.querySelector('.timer__button--js-stop');
const timerToggle = document.querySelector('.timer__button--js-toggle');
const timerHeading = document.querySelector('.timer__heading--js');
// DISPLAY
const display = document.querySelector('.display--js');
const displayElapsed = document.querySelector('.display__container--js--elapsed');
const displayRemaining = document.querySelector('.display__container--js-remaining');
const remainingMin = document.querySelector('.display__container--js-remaining .display__time--js-min');
const remainingSec = document.querySelector('.display__container--js-remaining .display__time--js-sec');
const remainingCSec = document.querySelector('.display__container--js-remaining .display__time--js-cSec');
const elapsedMin = document.querySelector('.display__container--js-elapsed .display__time--js-min');
const elapsedSec = document.querySelector('.display__container--js-elapsed .display__time--js-sec');
const elapsedCSec = document.querySelector('.display__container--js-elapsed .display__time--js-cSec');
const breakElapsedMin = document.querySelector('.break__time--js-min');
const breakElapsedSec = document.querySelector('.break__time--js-sec');
const breakElapsedCSec = document.querySelector('.break__time--js-cSec');
const breaksCounter = document.querySelector('.break__counter--js');
// PROGRESS BAR
const progressBar = document.querySelector('.progress__bar--js');
const progressPercents = document.querySelectorAll('[class*="progress__percent--js"]');
const progressPercentElapsed = document.querySelector('.progress__percent--js-elapsed');
const progressPercentRemaining = document.querySelector('.progress__percent--js-remaining');
const progressBarElapsed = document.querySelector('.progress__part--js-elapsed');
const progressBarRemaining = document.querySelector('.progress__part--js-remaining');
// STOP CONFIRMATION
const stopSection = document.querySelector('.stop--js');
const confirmStopButton = document.querySelector('.stop__button--js-stop');
const cancelStopButton = document.querySelector('.stop__button--js-cancel');
// OUTRO
const outroSection = document.querySelector('.outro--js');

/////////////////////////////////////////////////////////////////////// EVENTS 

rightButton.addEventListener('click', handleButtons);
leftButton.addEventListener('click', handleButtons);
startButton.addEventListener('click', handleButtons);