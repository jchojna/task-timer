const slideSection = (e) => {

  switch(e.target) {
    case rightButton:
      taskSection.className = 'task task--js slideOutLeft';
      timeSection.className = 'time time--js time--visible slideInRight';
      break;
    case leftButton:
      timeSection.className = 'time time--js slideOutRight';
      taskSection.className = 'task task--js task--visible slideInLeft';
      break;
    case startButton:
      timeSection.className = 'time time--js slideOutLeft';
      timerSection.className = 'timer timer--js timer--visible slideInRight';
      break;
    case timerStop:
      timerSection.className = 'timer timer--js slideOutLeft';
      taskSection.className = 'task task--js task--visible slideInRight';
      break;
    default: false;
  }
}

//////////////////////////////////////////////////////////////////// VARIABLES 

const taskSection = document.querySelector('.task--js');
const timeSection = document.querySelector('.time--js');
const timerSection = document.querySelector('.timer--js');

const rightButton = document.querySelector('.task__button--js-right');
const leftButton = document.querySelector('.time__button--js-left');
const startButton = document.querySelector('.time__start--js');
const timerStop = document.querySelector('.timer__button--js-stop');

/////////////////////////////////////////////////////////////////////// EVENTS 

rightButton.addEventListener('click', slideSection);
leftButton.addEventListener('click', slideSection);
startButton.addEventListener('click', slideSection);
timerStop.addEventListener('click', slideSection);