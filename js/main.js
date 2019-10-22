const makeTwoDigits = (number) => number < 10 ? `0${number}` : number;

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
      timeStartButton.disable = false;
      timeStartButton.classList.remove('time__start--disabled');
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

    displayElapsed.textContent = task.workTimeElapsedArray.join(':');
    displayRemaining.textContent = task.workTimeRemainingArray.join(':');

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
    breakDisplay.textContent = task.breakTimeElapsedArray.join(':');
  }
}

const setTotalTime = () => {
  let time = timeInput.value.split(/[mM]/).map(a => parseInt(a) || 0);
  time = time.length > 1 ? time : [0, ...time];
  const [minutes, seconds] = time;
  return minutes * 60000 + seconds * 1000;
}

const handleButtons = (e) => {

  switch(e.target) {

    case rightButton:
      if (isValid('task')) {
        taskSection.className = 'task slideOutLeft';
        timeSection.className = 'time time--visible slideInRight';
        task.name = taskNameInput.value;
        timerHeading.textContent = `"${task.name}"`;
      }
      break;

    case leftButton:
      timeSection.className = 'time time--js slideOutRight';
      taskSection.className = 'task task--js task--visible slideInLeft';
      break;

    case timeStartButton:
      if (isValid('time') && !timeStartButton.disable) {
        timeSection.className = 'time time--js slideOutLeft';
        timerSection.className = 'timer timer--js timer--visible slideInRight';
        task.isWork = true;
        task.previousTime = Date.now();
        task.timeTotal = setTotalTime();
        if (task.timeTotal <= 0) return;
        task.workTimeElapsed = 0;
        intervalWorkId = setInterval(() => countdown(), 10);
        timeStartButton.disable = true;
        timeStartButton.classList.add('time__start--disabled');
        task.totalBreaks = 0;
        task.breakTimeElapsed = 0;
        task.breakTimeElapsedArray = task.breakTimeElapsed;
        breakDisplay.textContent = task.breakTimeElapsedArray.join(':');
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
        displaySection.classList.add('display--inactive');
        breakSection.classList.add('break--active');
      // turning break mode off
      } else {
        togglePlayPauseButton('pause');
        clearInterval(intervalBreakId);
        task.isWork = true;
        task.isBreak = false;
        task.previousTime = Date.now();
        displaySection.classList.remove('display--inactive');
        breakSection.classList.remove('break--active');
      }
      
    default: false;
  }
}

const handleStopConfirm = (e) => {
  switch (e.target) {

    case confirmStopButton:
      stopSection.removeEventListener('click', handleStopConfirm);
      task.isWork = false;
      timeStartButton.disable = false;
      timeStartButton.classList.remove('time__start--disabled');
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

const isValid = (input) => {
  const alert = document.querySelector(`.${input}__alert--js`);

  if (input === 'task' ? !/\w/g.test(taskNameInput.value) : !/\d/g.test(timeInput.value)) {
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
  [...displaySection.children].forEach(item => {
    item.classList.toggle('display__container--visible');
    if (item.classList.contains('display__container--visible')) {
      item.classList.remove('display__container--hideUp')
      item.classList.add('display__container--showUp')
    } else {
      item.classList.remove('display__container--showUp');
      item.classList.add('display__container--hideUp');
    }
  });
  progressPercentElapsed.classList.toggle('progress__percent--visible');
  progressPercentRemaining.classList.toggle('progress__percent--visible');
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

/*
########   #######  ##     ##
##     ## ##     ## ###   ###
##     ## ##     ## #### ####
##     ## ##     ## ## ### ##
##     ## ##     ## ##     ##
##     ## ##     ## ##     ##
########   #######  ##     ##
*/
////////////////////////////////////////////////////////// CREATE DOM ELEMENTS 

const app = document.querySelector('#root');

const createDOMElement = (tag, attributes, content) => {
  const DOMElement = document.createElement(tag);
  Object.keys(attributes).forEach(key => DOMElement[key] = attributes[key]);
  DOMElement.textContent = content;
  return DOMElement;
}

const createSvgElement = (attributes, href) => {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
  Object.keys(attributes).forEach(key => {
    svg.setAttributeNS(null, key, attributes[key]);
  });
  use.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', href);
  svg.append(use);
  return svg;
}

// F0 /////////////////////////////////////////////////////////// TASK SECTION 

const taskSection = createDOMElement('section', {
  className: 'task task--visible'
});

const taskHeading = createDOMElement('h2', {
  className: 'task__heading'
}, 'Write your task');

const taskNameInput = createDOMElement('input', {
  className: 'task__input task__input--name',
  id: 'task-name',
  placeholder: "What would be your next task?"
});

const rightButton = createDOMElement('button', {
  className: 'button task__button task__button--right'
});

const rightButtonSvg = createSvgElement({
  class: 'task__svg',
  viewBox: '0 0 512 512'
}, 'assets/svg/icons.svg#arrow-right');

const taskRow = createDOMElement('div', { className: 'task__row' });

const taskNameLabel = createDOMElement('label', {
  className: 'task__label task__label--name',
  htmlFor: 'task-name'
}, 'Your task');

const taskAlert = createDOMElement('p', {
  className: 'task__alert task__alert--js'
}, 'You have to enter your task first!');

// F0 /////////////////////////////////////////////////////////// TIME SECTION 

const timeSection = createDOMElement('section', { className: 'time' });

const timeHeading = createDOMElement('h2', {
  className: 'time__heading'
}, 'Task Time Estimation');

const leftButton = createDOMElement('button', {
  className: 'button time__button time__button--left'
});

const leftButtonSvg = createSvgElement({
  class: 'task__svg',
  viewBox: '0 0 512 512'
}, 'assets/svg/icons.svg#arrow-left');

const timeRowInputs = createDOMElement('div', { className: 'time__row' });

const timeInput = createDOMElement('input', {
  id: 'task-time',
  className: 'time__input',
  placeholder: '00m00s',
  maxLength: 6,
  pattern: '(\\d?\\d[Mm])?(\\d?\\d[Ss])?'
});

const breakTimeInput = createDOMElement('input', {
  id: 'task-break',
  className: 'time__input',
  placeholder: '00m00s',
  maxLength: 6,
  pattern: '(\\d?\\d[Mm])?(\\d?\\d[Ss])?'
});

const timeStartButton = createDOMElement('button', {
  className: 'button time__start'
}, 'Start');

const timeRowLabels = createDOMElement('div', { className: 'time__row' });

const timeLabel = createDOMElement('label', {
  htmlFor: 'task-time',
  className: 'time__label time__label--task'
}, 'task time');

const breakTimeLabel = createDOMElement('label', {
  htmlFor: 'task-break',
  className: 'time__label time__label--break'
}, 'max break time');

const timeAlert = createDOMElement('p', {
  className: 'time__alert time__alert--js'
}, 'You have to specify time for the task');

// F0 ////////////////////////////////////////////////////////// TIMER SECTION 

const timerSection = createDOMElement('section', { className: 'timer' });

const timerContainer = createDOMElement('div', { className: 'timer__container' });

const timerHeading = createDOMElement('h2', {
  className: 'timer__heading'
}, 'Work on your task');

const timerButtons = createDOMElement('div', { className: 'timer__buttons' });

const timerPlayPause = createDOMElement('button', {
  className: 'button timer__button timer__button--playPause'
});

const timerPlaySvg = createSvgElement({
  class: 'timer__svg timer__svg--js-play',
  viewBox: '0 0 512 512'
}, 'assets/svg/icons.svg#play');

const timerPauseSvg = createSvgElement({
  class: 'timer__svg timer__svg--js-pause',
  viewBox: '0 0 512 512'
}, 'assets/svg/icons.svg#pause');

const timerStop = createDOMElement('button', {
  className: 'button timer__button timer__button--stop'
});

const timerStopSvg = createSvgElement({
  class: 'timer__svg',
  viewBox: '0 0 512 512'
}, 'assets/svg/icons.svg#stop');

const timerToggle = createDOMElement('button', {
  className: 'button timer__button timer__button--toggle'
});

const timerToggleSvg = createSvgElement({
  class: 'timer__svg',
  viewBox: '0 0 512 512'
}, 'assets/svg/icons.svg#toggle');

// F0 //////////////////////////////////////////////////////// DISPLAY SECTION 

const displaySection = createDOMElement('section', { className: 'display' });

const displayHeading = createDOMElement('h3', {
  className: 'display__heading visuallyhidden'
}, 'Display');

const displayElapsed = createDOMElement('div', {
  className: 'display__container display__container--elapsed display__container--visible'
}, '00:00:00');

const displayRemaining = createDOMElement('div', {
  className: 'display__container display__container--remaining'
});

// F0 ////////////////////////////////////////////////////////// BREAK SECTION 

const breakSection = createDOMElement('section', { className: 'break' });

const breaksCounter = createDOMElement('h3', {
  className: 'break__counter'
}, '0 breaks');

const breakDisplay = createDOMElement('div', { className: 'break__display' });

// F0 /////////////////////////////////////////////////////////// PROGRESS BAR 

const progressSection = createDOMElement('section', { className: 'progress' });

const progressHeader = createDOMElement('header', { className: 'progress__header' });

const progressPercentElapsed = createDOMElement('h3', {
  className: 'progress__percent progress__percent--visible'
}, '0%');

const progressPercentRemaining = createDOMElement('h3', {
  className: 'progress__percent'
}, '0%');

const progressBar = createDOMElement('div', { className: 'progress__bar' });

const progressBarElapsed = createDOMElement('div', {
  className: 'progress__part progress__part--loading'
});

const progressBarRemaining = createDOMElement('div', {
  className: 'progress__part progress__part--unloading'
});

// F0 /////////////////////////////////////////////////////////// STOP SECTION 

const stopSection = createDOMElement('section', { className: 'stop' });

const stopContainer = createDOMElement('div', { className: 'stop__container' });

const stopHeading = createDOMElement('h2', {
  className: 'stop__heading'
}, 'Are you sure you want to quit?');

const confirmStopButton = createDOMElement('button', {
  className: 'button stop__button stop__button--stop'
}, 'Yes');

const cancelStopButton = createDOMElement('button', {
  className: 'button stop__button stop__button--cancel'
}, 'Cancel');

// F0 ////////////////////////////////////////////////////////// OUTRO SECTION 

const outroSection = createDOMElement('section', { className: 'outro' });

const outroContainer = createDOMElement('div', { className: 'outro__container' });

const outroHeading = createDOMElement('h2', {
  className: 'outro__heading'
}, 'Congratulations!');

const outroParty = createDOMElement('span', { className: 'outro__party' }, '🎉');

const outroMessage = createDOMElement('p', { className: 'outro__message' });

const outroRetryButton = createDOMElement('button', {
  className: 'button outro__retry'
});

const outroRetryButtonSvg = createSvgElement({
  class: 'outro__svg',
  viewBox: '0 0 512 512'
}, 'assets/svg/icons.svg#retry');

/*
   ###    ########  ########  ######## ##    ## ########
  ## ##   ##     ## ##     ## ##       ###   ## ##     ##
 ##   ##  ##     ## ##     ## ##       ####  ## ##     ##
##     ## ########  ########  ######   ## ## ## ##     ##
######### ##        ##        ##       ##  #### ##     ##
##     ## ##        ##        ##       ##   ### ##     ##
##     ## ##        ##        ######## ##    ## ########
*/
//////////////////////////////////////////////////////////////////// APPENDING 

rightButton.append(rightButtonSvg);
taskRow.append(taskNameLabel, taskAlert);
taskSection.append(taskHeading, taskNameInput, rightButton, taskRow);

leftButton.append(leftButtonSvg);
timeRowInputs.append(timeInput, breakTimeInput, timeStartButton);
timeRowLabels.append(timeLabel, breakTimeLabel, timeAlert);
timeSection.append(timeHeading, leftButton, timeRowInputs, timeRowLabels);

timerPlayPause.append(timerPlaySvg, timerPauseSvg);
timerStop.append(timerStopSvg);
timerToggle.append(timerToggleSvg);
timerButtons.append(timerPlayPause, timerStop, timerToggle);

displaySection.append(displayHeading, displayElapsed, displayRemaining);
breakSection.append(breaksCounter, breakDisplay);
progressHeader.append(progressPercentElapsed, progressPercentRemaining);
progressBar.append(progressBarElapsed, progressBarRemaining);
progressSection.append(progressHeader, progressBar);

stopContainer.append(stopHeading, confirmStopButton, cancelStopButton);
stopSection.append(stopContainer);

outroHeading.append(outroParty);
outroRetryButton.append(outroRetryButtonSvg);
outroContainer.append(outroHeading, outroMessage, outroRetryButton);
outroSection.append(outroContainer);

timerContainer.append(
  timerHeading,
  timerButtons,
  displaySection,
  breakSection,
  progressSection
);

timerSection.append(timerContainer);

app.append(
  taskSection,
  timeSection,
  timerSection,
  stopSection,
  outroSection
);

//////////////////////////////////////////////////////////////////// VARIABLES 

const task = new Task(0);
let intervalWorkId = "";
let intervalBreakId = "";

/////////////////////////////////////////////////////////////////////// EVENTS 

rightButton.addEventListener('click', handleButtons);
leftButton.addEventListener('click', handleButtons);
timeStartButton.addEventListener('click', handleButtons);