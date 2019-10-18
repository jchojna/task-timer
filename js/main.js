const goToSection = (e) => {

  switch(e.target) {

    case rightButton:
      console.log(e.target);
      break;

    case leftButton:
      console.log(e.target);
      break;

    case timerStop:
      console.log(e.target);
      break;

  }
}

//////////////////////////////////////////////////////////////////// VARIABLES 

const rightButton = document.querySelector('.task__button--js-right');
const leftButton = document.querySelector('.task__button--js-left');
const timerStop = document.querySelector('.timer__button--js-stop');

/////////////////////////////////////////////////////////////////////// EVENTS 

rightButton.addEventListener('click', goToSection);
leftButton.addEventListener('click', goToSection);
timerStop.addEventListener('click', goToSection);