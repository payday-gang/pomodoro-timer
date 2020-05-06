const timer = document.getElementById("timer");

const playButtons = {
  start: document.getElementById("start"),
  stop: document.getElementById("stop"),
  reset: document.getElementById("reset")
};

let minutes = 25;
let seconds = 0;
updateTimer();  // innitial time

let countDown;

function updateTimer() {
  timer.textContent = `${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  document.title = `(${timer.textContent}) Pomodoro Timer`;
}

playButtons.start.addEventListener("click", function () {
  playButtons.start.textContent = "Started";
  playButtons.stop.textContent = "Stop";

  if (timer.textContent === "00:00") {
    return;
  }
  if (!countDown) {
    countDown = setInterval(function () {

      seconds--;
      if (seconds === -1) {
        if (minutes === 0) {
          clearInterval(countDown);
          return;
        }
        minutes--;
        seconds = 59;
      }

      updateTimer();
    }, 1000);
  }

  console.log("start");
});

playButtons.stop.addEventListener("click", function () {
  playButtons.start.textContent = "Start";
  playButtons.stop.textContent = "Stopped";

  clearInterval(countDown);
  countDown = false;

  console.log("stop");
});

playButtons.reset.addEventListener("click", function () {
  playButtons.start.textContent = "Start";
  playButtons.stop.textContent = "Stop";

  clearInterval(countDown);
  countDown = false;

  minutes = 25;
  seconds = 0;

  updateTimer();

  console.log("reset");
});