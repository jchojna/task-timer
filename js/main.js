class Task {
  constructor(time) {
    this.name = "",
    this.workTimeElapsed = 0,
    this.workTimeRemaining = time,
    this.previousTime = 0,
    this.breakTimeElapsed = 0,
    this.isWork = false,
    this.isBreak = false
  }

  get workTimeElapsedArray() {
    return this._workTimeElapsedArray;
  }
  set workTimeElapsedArray(time) {                                 // ! TO REFACTOR
    this._workTimeElapsedArray = [
      makeTwoDigits(Math.floor(time / 60000)),
      makeTwoDigits(Math.floor(time / 1000 % 60)),
      makeTwoDigits(Math.floor(time / 10 % 100))
    ];
  }
  get workTimeRemainingArray() {
    return this._workTimeRemainingArray;
  }
  set workTimeRemainingArray(time) {                               // ! TO REFACTOR
    this._workTimeRemainingArray = [
      makeTwoDigits(Math.floor(time / 60000)),
      makeTwoDigits(Math.floor(time / 1000 % 60)),
      makeTwoDigits(Math.floor(time / 10 % 100))
    ];
  }
  get breakTimeElapsedArray() {
    return this._breakTimeElapsedArray;
  }
  set breakTimeElapsedArray(time) {                                 // ! TO REFACTOR
    this._breakTimeElapsedArray = [
      makeTwoDigits(Math.floor(time / 60000)),
      makeTwoDigits(Math.floor(time / 1000 % 60)),
      makeTwoDigits(Math.floor(time / 10 % 100))
    ];
  }
  get overallTimeArray() {
    return this._overallTimeArray;
  }
  set overallTimeArray(time) {                                 // ! TO REFACTOR
    this._overallTimeArray = [
      Math.floor(time / 60000),
      Math.floor(time / 1000 % 60)
    ];
  }
}
// F0 ////////////////////////////////////////////////////////////// COUNTDOWN 

const countdown = () => {
  if (task.isWork) {
    let {
      workTimeElapsed,
      workTimeRemaining,
      timeTotal,
      previousTime
    } = task;
    
    // when countdown finishes
    if (workTimeElapsed >= timeTotal) {
      task.workTimeElapsed, workTimeElapsed = timeTotal;
      task.workTimeRemaining, workTimeRemaining = 0;
      task.isWork = false;
      startButton.disable = false;
      startButton.classList.remove('time__start--disabled');
      togglePlayPauseButton('play');
      stopSection.removeEventListener('click', handleStopConfirm);
      stopSection.classList.contains('stop--visible') ? toggleStopConfirm() : false;
      timerStop.removeEventListener('click', handleButtons);
      timerPlayPause.removeEventListener('click', handleButtons);
      timerToggle.removeEventListener('click', handleTimerToggle);
      task.overallTime = task.workTimeElapsed + task.breakTimeElapsed;
      task.overallTimeArray = task.overallTime;
      clearInterval(intervalWorkId);
      clearInterval(intervalBreakId);
      handleOutro();
      outroRetryButton.addEventListener('click', handleRetry);

    } else {
      const now = Date.now();
      task.previousTime = now;
      task.workTimeElapsed = workTimeElapsed + (now - previousTime);
    }

    task.workTimeRemaining = timeTotal - workTimeElapsed;
    task.workTimeElapsedArray = workTimeElapsed;
    task.workTimeRemainingArray = workTimeRemaining;

    const [eMin, eSec, eCSec] = task.workTimeElapsedArray;                             // ! TO REFACTOR
    elapsedMin.textContent = eMin;
    elapsedSec.textContent = eSec;
    elapsedCSec.textContent = eCSec;

    const [rMin, rSec, rCSec] = task.workTimeRemainingArray;                           // ! TO REFACTOR
    remainingMin.textContent = rMin;
    remainingSec.textContent = rSec;
    remainingCSec.textContent = rCSec;

    const percentElapsed = workTimeElapsed / timeTotal * 100;                           // ! TO REFACTOR
    progressPercentElapsed.textContent = `${Math.round(percentElapsed)} %`;
    progressBarElapsed.style.width = `${percentElapsed}%`;
    
    const percentRemaining = task.workTimeRemaining / task.timeTotal * 100;            // ! TO REFACTOR
    progressPercentRemaining.textContent = `${Math.round(percentRemaining)} %`;
    progressBarRemaining.style.width = `${percentRemaining}%`;
  }
}

const breakTime = () => {
  if (task.isBreak) {
    const {
      previousTime,
      breakTimeElapsed
    } = task;

    const now = Date.now();
    task.previousTime = now;
    task.breakTimeElapsed = breakTimeElapsed + (now - previousTime);

    task.breakTimeElapsedArray = task.breakTimeElapsed;
    const [bMin, bSec, bCSec] = task.breakTimeElapsedArray;                           // ! TO REFACTOR
    breakTimeElapsedMin.textContent = bMin;
    breakTimeElapsedSec.textContent = bSec;
    breakTimeElapsedCSec.textContent = bCSec;
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
        task.isWork = true;
        task.previousTime = Date.now();
        task.timeTotal = setTotalTime();
        if (task.timeTotal <= 0) return;
        task.workTimeElapsed = 0;
        intervalWorkId = setInterval(() => countdown(), 10);
        startButton.disable = true;
        startButton.classList.add('time__start--disabled');
        task.totalBreaks = 0;
        task.breakTimeElapsed = 0;
        task.breakTimeElapsedArray = task.breakTimeElapsed;
        const [bMin, bSec, bCSec] = task.breakTimeElapsedArray;                           // ! TO REFACTOR
        breakTimeElapsedMin.textContent = bMin;
        breakTimeElapsedSec.textContent = bSec;
        breakTimeElapsedCSec.textContent = bCSec;
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
      if (task.isWork) {
        togglePlayPauseButton('play');
        task.isWork = false;
        task.isBreak = true;
        task.totalBreaks = task.totalBreaks + 1;
        updateBreaksCounter();
        intervalBreakId = setInterval(() => breakTime(), 10);
      // turning break mode off
      } else {
        togglePlayPauseButton('pause');
        clearInterval(intervalBreakId);
        task.isWork = true;
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
      task.isWork = false;
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
  const {name, totalBreaks, overallTime, breakTimeElapsed} = task;
  const [minutes, seconds] = task.overallTimeArray;
  let [breakMinutes, breakSeconds] = task.breakTimeElapsedArray;
  breakMinutes = parseInt(breakMinutes);
  breakSeconds = parseInt(breakSeconds);
  outroSection.classList.add('outro--visible');
  // ! TO REFACTOR
  outroMessage.innerHTML = `
  You have finished your task entitled <br>
  <span class="outro__message--bold">"${name}"</span><br>
  in
  <span class="outro__message--bold">
    ${minutes > 1 ? `${minutes} minutes` : minutes === 1 ? `${minutes} minute` : ``}
  </span>
  ${minutes > 0 && seconds != 0 ? `and` : ``}
  <span class="outro__message--bold">
    ${seconds > 1 ? `${seconds} seconds` : seconds === 1 ? `${seconds} second` : ``}
  </span>
  including break time. <br>
  You had
  <span class="outro__message--bold">
    ${totalBreaks > 1
    ? `${totalBreaks} breaks`
    : totalBreaks === 1 ? `${totalBreaks} break` : `no brakes`}
  </span>
  during this task
  ${totalBreaks
    ? `<span class="outro__message--bold">
        ${breakMinutes > 1
        ? `${breakMinutes} minutes`
        : breakMinutes === 1 ? `${breakMinutes} minute` : ``}
      </span>
      ${breakMinutes > 0 && breakTimeElapsed != 0 ? `and` : ``}
      <span class="outro__message--bold">
        ${breakSeconds > 1
        ? `${breakSeconds} seconds`
        : breakSeconds === 1 ? `${breakSeconds} second` : `split second`}
      </span>
      long, what makes it around
      <span class="outro__message--bold">
        ${Math.round(breakTimeElapsed / overallTime * 100)}
      </span>
      % of all time.`
    : `.`
  }`
}

const handleRetry = () => {
  outroSection.classList.remove('outro--visible');
  timerSection.className = 'timer timer--js slideOutLeft';
  taskSection.className = 'task task--js task--visible slideInRight';
  outroRetryButton.removeEventListener('click', handleRetry);
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
const breakTimeElapsedMin = document.querySelector('.break__time--js-min');
const breakTimeElapsedSec = document.querySelector('.break__time--js-sec');
const breakTimeElapsedCSec = document.querySelector('.break__time--js-cSec');
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
const outroMessage = document.querySelector('.outro__message--js');
const outroRetryButton = document.querySelector('.outro__retry--js');

/////////////////////////////////////////////////////////////////////// EVENTS 

rightButton.addEventListener('click', handleButtons);
leftButton.addEventListener('click', handleButtons);
startButton.addEventListener('click', handleButtons);