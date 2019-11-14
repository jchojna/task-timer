export const validateTaskName = (name) => name.length > 0 ? true : false;
export const validateTaskTime = (time, total) => /^\d*$/.test(time) && total > 0;
export const validateBreakTime = (time) => /^\d*$/.test(time);

export const getTotalTime = (minutes, seconds) => {
  minutes = !minutes ? 0 : parseInt(minutes);
  seconds = !seconds ? 0 : parseInt(seconds);
  return (minutes * 60000) + (seconds * 1000);
}

export const getTimeArray = (time) => {
  const makeTwoDigits = (number) => number < 10 ? `0${number}` : `${number}`;
  return [
    makeTwoDigits(Math.floor(time / 60000)),
    makeTwoDigits(Math.floor(time / 1000 % 60)),
    makeTwoDigits(Math.floor(time / 10 % 100))
  ]
}

export const handleTimeChange = (minutes, seconds, units, type) => {
  
  if (type === 'task') {
    const totalTaskTime = getTotalTime(minutes, seconds);
    if (units === 'minutes') {
      return {
        taskMinutes: minutes,
        totalTaskTime,
        totalTaskTimeArray: getTimeArray(totalTaskTime),
        isTaskTimeValid: validateTaskTime(minutes, totalTaskTime),
        alertTimeFlag: true
      };
    } else if (units === 'seconds') {
      return {
        taskSeconds: seconds,
        totalTaskTime,
        totalTaskTimeArray: getTimeArray(totalTaskTime),
        isTaskTimeValid: validateTaskTime(seconds, totalTaskTime),
        alertTimeFlag: true
      };
    }
  } else if (type === 'break') {
    const totalBreakTime = getTotalTime(minutes, seconds);
    if (units === 'minutes') {
      return {
        breakMinutes: minutes,
        totalBreakTime,
        totalBreakTimeArray: getTimeArray(totalBreakTime),
        isBreakTimeValid: validateBreakTime(minutes),
        alertTimeFlag: true
      };
    } else if (units === 'seconds') {
      return {
        breakSeconds: seconds,
        totalBreakTime,
        totalBreakTimeArray: getTimeArray(totalBreakTime),
        isBreakTimeValid: validateBreakTime(seconds),
        alertTimeFlag: true
      };
    }
  }
}