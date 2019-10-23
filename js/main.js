const makeTwoDigits = (number) => number < 10 ? `0${number}` : number;

const toggleStopConfirm = () => stopSection.classList.toggle('stop--visible');

const makeTimeArray = (time) => [
  makeTwoDigits(Math.floor(time / 60000)),
  makeTwoDigits(Math.floor(time / 1000 % 60)),
  makeTwoDigits(Math.floor(time / 10 % 100))
];
// F0 ///////////////////////////////////////////////////////////// TASK CLASS 

class Task {
  constructor(time) {
    this.breakTimeElapsed = 0,
    this.isWork = false,
    this.isBreak = false,
    this.name = "",
    this.previousTime = 0,
    this.workTimeElapsed = 0,
    this.workTimeRemaining = time
  }

  get workTimeElapsedArray() {
    return this._workTimeElapsedArray;
  }
  set workTimeElapsedArray(time) {
    this._workTimeElapsedArray = makeTimeArray(time);
  }
  get workTimeRemainingArray() {
    return this._workTimeRemainingArray;
  }
  set workTimeRemainingArray(time) {
    this._workTimeRemainingArray = makeTimeArray(time)
  }
  get breakTimeElapsedArray() {
    return this._breakTimeElapsedArray;
  }
  set breakTimeElapsedArray(time) {
    this._breakTimeElapsedArray = makeTimeArray(time)
  }
  get overallTimeArray() {
    return this._overallTimeArray;
  }
  set overallTimeArray(time) {
    this._overallTimeArray = makeTimeArray(time)
  }
}
// F0 ////////////////////////////////////////////////////// INPUTS VALIDATION 

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
// F0 //////////////////////////////////////////////////// HANDLE MAIN BUTTONS 

const handleMainButtons = (e) => {

  switch(e.target) {

    case rightButton:
      if (isValid('task')) {
        taskSection.className = 'task slideOutLeft';
        timeSection.className = 'time time--visible slideInRight';
        task.name = taskNameInput.value;
        timerHeading.textContent = `"${task.name}"`;
      } break;

    case leftButton:
      timeSection.className = 'time slideOutRight';
      taskSection.className = 'task task--visible slideInLeft';
      break;

    case timeStartButton:
      if (isValid('time') && !timeStartButton.disable) {
        task.isWork = true;
        task.previousTime = Date.now();
        task.timeTotal = setTotalTime();
        if (task.timeTotal <= 0) return;
        task.workTimeElapsed = 0;
        task.totalBreaks = 0;
        task.breakTimeElapsed = 0;
        task.breakTimeElapsedArray = task.breakTimeElapsed;
        breakDisplay.textContent = task.breakTimeElapsedArray.join(':');
        togglePlayPauseButton('pause');
        updateBreaksCounter();
        intervalWorkId = setInterval(() => workTime(), 10);
        timeSection.className = 'time slideOutLeft';
        timerSection.className = 'timer timer--visible slideInRight';
        timeStartButton.disable = true;
        timeStartButton.classList.add('time__start--disabled');
        timerStop.addEventListener('click', handleTimerButtons);
        timerPlayPause.addEventListener('click', handleTimerButtons);
        timerToggle.addEventListener('click', handleTimerButtons);
      } break;
      
    default: false;
  }
}
// F0 ///////////////////////////////////////////////////////// SET TOTAL TIME 

const setTotalTime = () => {
  let time = timeInput.value.split(/[mM]/).map(a => parseInt(a) || 0);
  time = time.length > 1 ? time : [0, ...time];
  const [minutes, seconds] = time;
  return minutes * 60000 + seconds * 1000;
}
// F0 ////////////////////////////////////////////////// UPDATE BREAKS COUNTER 

const updateBreaksCounter = () => breaksCounter.textContent =
  `${task.totalBreaks} ${task.totalBreaks === 1 ? `break` : `breaks`}`;

// F0 /////////////////////////////////////////////////// HANDLE TIMER BUTTONS 

const handleTimerButtons = (e) => {

  switch(e.target) {

    case timerPlayPause:
      // enabling break mode
      if (task.isWork) {
        task.isWork = false;
        task.isBreak = true;
        task.totalBreaks = task.totalBreaks + 1;
        togglePlayPauseButton('play');
        updateBreaksCounter();
        intervalBreakId = setInterval(() => breakTime(), 10);
        displaySection.classList.add('display--inactive');
        breakSection.classList.add('break--active');
      // turning break mode off
      } else {
        task.isWork = true;
        task.isBreak = false;
        task.previousTime = Date.now();
        togglePlayPauseButton('pause');
        clearInterval(intervalBreakId);
        displaySection.classList.remove('display--inactive');
        breakSection.classList.remove('break--active');
      } break;

    case timerStop:
      toggleStopConfirm();
      stopSection.addEventListener('click', handleStopConfirm);
      break;

    case timerToggle:
      toggleTimeDisplay('display__time', 'visible', 'showUp', 'hideUp');
      toggleTimeDisplay('progress__part', 'loading', 'unloading', 'loading');
      progressPercentElapsed.classList.toggle('progress__percent--visible');
      progressPercentRemaining.classList.toggle('progress__percent--visible');
      break;

    default: false;
  }
}
// F0 //////////////////////////////////////////////////// TOGGLE TIME DISPLAY 

const toggleTimeDisplay = (blockElement, modActive, modB, modC) => {
  const nodes = document.querySelectorAll(`[class*="${blockElement}"]`);
  const blockName = blockElement.split('__')[0];

  [...nodes].forEach(item => {
  blockName === 'display' ? item.classList.toggle(`${blockElement}--${modActive}`): false;
  const ifActive = item.classList.contains(`${blockElement}--${modActive}`);
  item.classList.remove(`${blockElement}--${ifActive ? modC : modB}`);
  item.classList.add(`${blockElement}--${ifActive ? modB : modC}`);
  });
}
// F0 ////////////////////////////////// TOGGLE PLAY / PAUSE BUTTON APPEARANCE 

const togglePlayPauseButton = (action) => {
  const opposite = action === 'play' ? 'pause' : 'play';
  const visibleSvg = document.querySelector(`.timer__svg--js-${action}`);
  const hiddenSvg = document.querySelector(`.timer__svg--js-${opposite}`);

  visibleSvg.classList.remove('timer__svg--hidden');
  hiddenSvg.classList.add('timer__svg--hidden');
}

const handleStopConfirm = (e) => {
  switch (e.target) {

    case confirmStopButton:
      toggleStopConfirm();
      stopWorktime();
      timerSection.className = 'timer timer--js slideOutLeft';
      taskSection.className = 'task task--js task--visible slideInRight';
      break;  

    case cancelStopButton:
      toggleStopConfirm();
      break;
  }
}
// F0 ////////////////////////////////////////////////////////////// WORK TIME 

const workTime = () => {
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
      task.overallTime = task.workTimeElapsed + task.breakTimeElapsed;
      task.overallTimeArray = task.overallTime;
      stopSection.classList.contains('stop--visible') ? toggleStopConfirm() : false;
      stopWorktime();
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
    handlePercentSection(workTimeElapsed, progressPercentElapsed, progressBarElapsed);
    handlePercentSection(workTimeRemaining, progressPercentRemaining, progressBarRemaining);
  }
}
// F0 ///////////////////////////////////////////////// HANDLE PERCENT SECTION 

const handlePercentSection = (workTime, progressPercent, progressBar) => {
  const percent = workTime / task.timeTotal * 100;
  progressPercent.textContent = `${Math.round(percent)}%`;
  progressBar.style.width = `${percent}%`;
}
// F0 ////////////////////////////////////////////////////////// STOP WORKTIME 

const stopWorktime = () => {
  task.isWork = false;
  togglePlayPauseButton('play');
  clearInterval(intervalWorkId);
  clearInterval(intervalBreakId);
  timeStartButton.disable = false;
  timeStartButton.classList.remove('time__start--disabled');
  stopSection.removeEventListener('click', handleStopConfirm);
  timerStop.removeEventListener('click', handleTimerButtons);
  timerPlayPause.removeEventListener('click', handleTimerButtons);
  timerToggle.removeEventListener('click', handleTimerButtons);
}
// F0 ///////////////////////////////////////////////////////////// BREAK TIME 

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
// F0 /////////////////////////////////////////////////////////// HANDLE OUTRO 

const handleOutro = () => {
  const {name, totalBreaks, overallTime, breakTimeElapsed} = task;
  const [minutes, seconds] = task.overallTimeArray;
  let [breakMinutes, breakSeconds] = task.breakTimeElapsedArray;
  breakMinutes = parseInt(breakMinutes);
  breakSeconds = parseInt(breakSeconds);
  outroSection.classList.add('outro--visible');

  const timeResult = (min, sec) => `
    <span class="outro__message--bold">
      ${min > 1 ? `${min} minutes` : min === 1 ? `${min} minute` : ``}
    </span>
      ${min > 0 && (sec === breakSeconds ? task.breakTimeElapsed != 0 : sec != 0)
      ? `and` : ``}
    <span class="outro__message--bold">
      ${sec > 1 ? `${sec} seconds` : sec === 1 ? `${sec} second` : `a split second`}
    </span>`;
  
  outroMessage.innerHTML = `
  You have finished your task entitled <br>
  <span class="outro__message--bold">"${name}"</span><br>
  in ${timeResult(minutes, seconds)}
  ${breakTimeElapsed > 0 ? `including break time.` : `.`} <br>
  You had
  <span class="outro__message--bold">
    ${totalBreaks > 1
    ? `${totalBreaks} breaks`
    : totalBreaks === 1 ? `${totalBreaks} break` : `no brakes`}
  </span>
  during this task
  ${totalBreaks
    ? `${timeResult(breakMinutes, breakSeconds)} long, what makes it around
      <span class="outro__message--bold">
        ${Math.round(breakTimeElapsed / overallTime * 100)}%
      </span>
      of all time.`
    : `.`
  }`
}
// F0 //////////////////////////////////////////////////// HANDLE RETRY BUTTON 

const handleRetry = () => {
  outroSection.classList.remove('outro--visible');
  timerSection.className = 'timer timer--js slideOutLeft';
  taskSection.className = 'task task--js task--visible slideInRight';
  outroRetryButton.removeEventListener('click', handleRetry);
}
////////////////////////////////////////////////////////// CREATE DOM ELEMENTS 

const app = document.querySelector('#root');

// F0 /////////////////////////////////////////////////////////// TASK SECTION 

const taskHeading = React.createElement('h2', {
  className: 'task__heading'
}, 'Write your task');

const taskNameInput = React.createElement('input', {
  className: 'task__input task__input--name',
  id: 'task-name',
  placeholder: "What would be your next task?"
});

const rightButtonUse = React.createElement('use', {
  href: 'assets/svg/icons.svg#arrow-right'
});

const rightButtonSvg = React.createElement('svg', {
  className: 'task__svg',
  viewBox: '0 0 512 512'
}, rightButtonUse);

const rightButton = React.createElement('button', {
  className: 'button task__button task__button--right'
}, rightButtonSvg);

const taskNameLabel = React.createElement('label', {
  className: 'task__label task__label--name',
  htmlFor: 'task-name'
}, 'Your task');

const taskAlert = React.createElement('p', {
  className: 'task__alert task__alert--js'
}, 'You have to enter your task first!');

const taskRow = React.createElement('div', {
  className: 'task__row'
}, taskNameLabel, taskAlert);

const taskSection = React.createElement('section', {
  className: 'task'
}, taskHeading, taskNameInput, rightButton, taskRow);

// F0 /////////////////////////////////////////////////////////// TIME SECTION 

const timeHeading = React.createElement('h2', {
  className: 'time__heading'
}, 'Task Time Estimation');

const leftButton = React.createElement('button', {
  className: 'button time__button time__button--left'
});

const leftButtonSvg = React.createElement('svg', {
  className: 'task__svg',
  viewBox: '0 0 512 512'
});

const leftButtonUse = React.createElement('use', {
  href: 'assets/svg/icons.svg#arrow-left'
});

const timeInput = React.createElement('input', {
  id: 'task-time',
  className: 'time__input',
  placeholder: '00m00s',
  maxLength: 6,
  pattern: '(\\d?\\d[Mm])?(\\d?\\d[Ss])?'
});

const breakTimeInput = React.createElement('input', {
  id: 'task-break',
  className: 'time__input',
  placeholder: '00m00s',
  maxLength: 6,
  pattern: '(\\d?\\d[Mm])?(\\d?\\d[Ss])?'
});

const timeStartButton = React.createElement('button', {
  className: 'button time__start'
}, 'Start');

const timeRowInputs = React.createElement('div', {
  className: 'time__row'
}, timeInput, breakTimeInput, timeStartButton);

const timeLabel = React.createElement('label', {
  htmlFor: 'task-time',
  className: 'time__label time__label--task'
}, 'task time');

const breakTimeLabel = React.createElement('label', {
  htmlFor: 'task-break',
  className: 'time__label time__label--break'
}, 'max break time');

const timeAlert = React.createElement('p', {
  className: 'time__alert time__alert--js'
}, 'You have to specify time for the task');

const timeRowLabels = React.createElement('div', {
  className: 'time__row'
}, timeLabel, breakTimeLabel, timeAlert);

const timeSection = React.createElement('section', {
  className: 'time'
}, timeHeading, leftButton, timeRowInputs, timeRowLabels);

// F0 ////////////////////////////////////////////////////////// TIMER SECTION 

const timerHeading = React.createElement('h2', {
  className: 'timer__heading'
}, 'Work on your task');

const timerPlayUse = React.createElement('use', {
  href: 'assets/svg/icons.svg#play'
})

const timerPlaySvg = React.createElement('svg', {
  className: 'timer__svg timer__svg--js-play',
  viewBox: '0 0 512 512'
}, timerPlayUse);

const timerPauseUse = React.createElement('svg', {
  href: 'assets/svg/icons.svg#pause'
})

const timerPauseSvg = React.createElement('svg', {
  className: 'timer__svg timer__svg--js-pause',
  viewBox: '0 0 512 512'
}, timerPauseUse);

const timerPlayPause = React.createElement('button', {
  className: 'button timer__button timer__button--playPause'
}, timerPlaySvg, timerPauseSvg);

const timerStopUse = React.createElement('use', {
  href: 'assets/svg/icons.svg#stop'
});

const timerStopSvg = React.createElement('svg', {
  className: 'timer__svg',
  viewBox: '0 0 512 512'
}, timerStopUse);

const timerStop = React.createElement('button', {
  className: 'button timer__button timer__button--stop'
}, timerStopSvg);

const timerToggleUse = React.createElement('use', {
  href: 'assets/svg/icons.svg#toggle'
});

const timerToggleSvg = React.createElement('svg', {
  className: 'timer__svg',
  viewBox: '0 0 512 512'
}, timerToggleUse);

const timerToggle = React.createElement('button', {
  className: 'button timer__button timer__button--toggle'
}, timerToggleSvg);

const timerButtons = React.createElement('div', {
  className: 'timer__buttons'
}, timerPlayPause, timerStop, timerToggle);

// F0 //////////////////////////////////////////////////////// DISPLAY SECTION 

/* displaySection.append(displayHeading, displayElapsed, displayRemaining);
breakSection.append(breaksCounter, breakDisplay);
progressHeader.append(progressPercentElapsed, progressPercentRemaining);
progressBar.append(progressBarElapsed, progressBarRemaining);
progressSection.append(progressHeader, progressBar); */

/* const displaySection = React.createElement('section', { className: 'display' });

const displayHeading = React.createElement('h3', {
  className: 'display__heading visuallyhidden'
}, 'Display');

const displayElapsed = React.createElement('div', {
  className: 'display__time display__time--elapsed display__time--visible'
}, '00:00:00');

const displayRemaining = React.createElement('div', {
  className: 'display__time display__time--remaining'
}); */

// F0 ////////////////////////////////////////////////////////// BREAK SECTION 

/* const breakSection = React.createElement('section', { className: 'break' });

const breaksCounter = React.createElement('h3', {
  className: 'break__counter'
}, '0 breaks');

const breakDisplay = React.createElement('div', { className: 'break__display' }); */

// F0 /////////////////////////////////////////////////////////// PROGRESS BAR 

/* const progressSection = React.createElement('section', { className: 'progress' });

const progressHeader = React.createElement('header', { className: 'progress__header' });

const progressPercentElapsed = React.createElement('h3', {
  className: 'progress__percent progress__percent--visible'
}, '0%');

const progressPercentRemaining = React.createElement('h3', {
  className: 'progress__percent'
}, '0%');

const progressBar = React.createElement('div', { className: 'progress__bar' });

const progressBarElapsed = React.createElement('div', {
  className: 'progress__part progress__part--loading'
});

const progressBarRemaining = React.createElement('div', {
  className: 'progress__part progress__part--unloading'
}); */

const timerContainer = React.createElement('div',
  { className: 'timer__container' },
  timerHeading,
  timerButtons/* ,
  displaySection,
  breakSection,
  progressSection */
  );

const timerSection = React.createElement('section', {
  className: 'timer timer--visible'
}, timerContainer);

// F0 /////////////////////////////////////////////////////////// STOP SECTION 

/* stopContainer.append(stopHeading, confirmStopButton, cancelStopButton);
stopSection.append(stopContainer); */

/* const stopSection = React.createElement('section', { className: 'stop' });

const stopContainer = React.createElement('div', { className: 'stop__container' });

const stopHeading = React.createElement('h2', {
  className: 'stop__heading'
}, 'Are you sure you want to quit?');

const confirmStopButton = React.createElement('button', {
  className: 'button stop__button stop__button--stop'
}, 'Yes');

const cancelStopButton = React.createElement('button', {
  className: 'button stop__button stop__button--cancel'
}, 'Cancel'); */

// F0 ////////////////////////////////////////////////////////// OUTRO SECTION 

/* outroHeading.append(outroParty);
outroRetryButton.append(outroRetryButtonSvg);
outroContainer.append(outroHeading, outroMessage, outroRetryButton);
outroSection.append(outroContainer); */

/* const outroSection = React.createElement('section', { className: 'outro' });

const outroContainer = React.createElement('div', { className: 'outro__container' });

const outroHeading = React.createElement('h2', {
  className: 'outro__heading'
}, 'Congratulations!');

const outroParty = React.createElement('span', { className: 'outro__party' }, '🎉');

const outroMessage = React.createElement('p', { className: 'outro__message' });

const outroRetryButton = React.createElement('button', {
  className: 'button outro__retry'
});

const outroRetryButtonSvg = createSvgElement({
  class: 'outro__svg',
  viewBox: '0 0 512 512'
}, 'assets/svg/icons.svg#retry'); */

/////////////////////////////////////////////////////////// APPENDING ELEMENTS 
/*


app.append(
  timerSection,
  stopSection,
  outroSection
); */

const appContainer = React.createElement('div', {
  className: 'app__container'
}, taskSection, timeSection, timerSection);

ReactDOM.render(appContainer, app);

const task = new Task(0);
let intervalWorkId = "";
let intervalBreakId = "";

/* rightButton.addEventListener('click', handleMainButtons);
leftButton.addEventListener('click', handleMainButtons);
timeStartButton.addEventListener('click', handleMainButtons); */