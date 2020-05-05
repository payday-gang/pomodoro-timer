const timer = document.querySelector('#timer');

const playButtons = {
  start: document.querySelector('#start'),
  stop: document.querySelector('#stop'),
  resetButton: document.querySelector('#reset')
};

let minutes = 25;
let seconds = `${0}${0}`;                   // innitial timer
timer.textContent = `${minutes}:${seconds}`;

playButtons.start.onclick = function () {
  interval = setInterval(function () {
    seconds -= 1;
    if (seconds === -1) {
      minutes -= 1;
      if (minutes === -1) {
        clearInterval(interval);
        return;
      }
      console.log("0");
      seconds = "59";
    }
    if (seconds < 10) {
      seconds = `0${seconds}`;
    }
    timer.textContent = `${minutes}:${seconds}`;
    console.log("d");
  }, 1000);
  playButtons.start.disabled = true;
  playButtons.start.textContent = "Running";
}
