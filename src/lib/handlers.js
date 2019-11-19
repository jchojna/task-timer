import { maxTaskNameLength } from './globalVariables';

export const validateTaskName = (name) => name.length > 0 ? true : false;
export const validateTaskTime = (time, total) => /^\d*$/.test(time) && total > 0;
export const validateBreakTime = (time) => /^\d*$/.test(time);

const getTotalTime = (minutes, seconds) => {
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
        isTaskTimeValid: validateTaskTime(minutes, totalTaskTime)
      };
    } else if (units === 'seconds') {
      return {
        taskSeconds: seconds,
        totalTaskTime,
        totalTaskTimeArray: getTimeArray(totalTaskTime),
        isTaskTimeValid: validateTaskTime(seconds, totalTaskTime)
      };
    }
  } else if (type === 'break') {
    const totalBreakTime = getTotalTime(minutes, seconds);
    if (units === 'minutes') {
      return {
        breakMinutes: minutes,
        totalBreakTime,
        totalBreakTimeArray: getTimeArray(totalBreakTime),
        isBreakTimeValid: validateBreakTime(minutes)
      };
    } else if (units === 'seconds') {
      return {
        breakSeconds: seconds,
        totalBreakTime,
        totalBreakTimeArray: getTimeArray(totalBreakTime),
        isBreakTimeValid: validateBreakTime(seconds)
      };
    }
  }
}

export const formatTimeResult = ([minutes, seconds], elapsedBreakTime) => {
  minutes = parseInt(minutes);
  seconds = parseInt(seconds);
  return `
    ${ minutes > 1
    ? ` ${minutes} minutes` : minutes === 1
    ? ` ${minutes} minute` : "" }
    ${ minutes > 0 && (elapsedBreakTime ? elapsedBreakTime !== 0 : seconds !== 0)
    ? "and" : "" }
    ${ seconds > 1
    ? ` ${seconds} seconds` : seconds === 1
    ? ` ${seconds} second` : elapsedBreakTime && elapsedBreakTime !== 0
    ? " a split second" : "" }
  `;
}

export const taskNameProgressStyle = (length) => {
  return { width: `${length / maxTaskNameLength * 100}%` };
};