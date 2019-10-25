
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

// F0 //////////////////////////////////////////////////// HANDLE MAIN BUTTONS 

const handleMainButtons = (e) => {

  if (isValid('time') && !timeStartButton.disable) {
    if (task.timeTotal <= 0) return;
    
    task.breakTimeElapsedArray = task.breakTimeElapsed;
    breakDisplay.textContent = task.breakTimeElapsedArray.join(':');
    updateBreaksCounter();
    intervalWorkId = setInterval(() => workTime(), 10);
  }
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
      progressPercentElapsed.classList.toggle('progress__percent--visible');
      progressPercentRemaining.classList.toggle('progress__percent--visible');
      break;

    default: false;
  }
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