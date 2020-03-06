import { maxTaskNameLength } from './globalVariables';

export const validateTaskName = (name) => name.length > 0 ? true : false;
export const validateTaskTime = (time, total) => /^\d*$/.test(time) && total > 0;
export const validateBreakTime = (time) => /^\d*$/.test(time);

export const getCapitalized = (string) => {
  return string.charAt(0).toUpperCase() + string.substring(1);
}

const getTotalTime = (minutes, seconds) => {
  minutes = !minutes ? 0 : parseInt(minutes);
  seconds = !seconds ? 0 : parseInt(seconds);
  return (minutes * 60000) + (seconds * 1000);
}

export const makeTwoDigits = (value) => value < 10 ? `0${value}` : `${value}`;


export const getNumFromRange = (value, operation, lowerLimit, upperLimit) => {
  const newValue = operation === "increase"
  ? parseInt(value) + 1 : parseInt(value) - 1;

  return newValue >= lowerLimit && newValue <= upperLimit
  ? makeTwoDigits(newValue)
  : newValue < lowerLimit
    ? makeTwoDigits(lowerLimit)
    : makeTwoDigits(upperLimit);
}

export const getTimeArray = (time) => {
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

export const breaksAmount = (totalBreaks) => `${totalBreaks}
${totalBreaks === 1 ? "break" : "breaks"} used
`;

export const getTotalDays = (date) => {
  
  const getDateString = (date) => new Date(date).toISOString().slice(0,10);
  
  const currentDate = new Date();
  let currentDateStr = getDateString(currentDate);
  const startDateStr = getDateString(date);
  let totalDays = 1;
  let limit = 200;

  while (startDateStr !== currentDateStr && limit > 0) {
    currentDate.setDate(currentDate.getDate() - 1);
    currentDateStr = getDateString(new Date(currentDate));
    totalDays++;
    limit--;
  }
  return totalDays;
}