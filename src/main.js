/* if (isValid('time') && !timeStartButton.disable) {
  if (task.timeTotal <= 0) return; */

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

// F0 ////////////////////////////////////////////////////////// STOP WORKTIME 

const stopWorktime = () => {
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