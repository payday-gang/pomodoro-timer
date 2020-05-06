const timer = document.getElementById("timer");

const playButtons = {
  start: document.getElementById("start"),
  stop: document.getElementById("stop"),
  reset: document.getElementById("reset")
};

const settings = {
  pomodoro: {
    upButton: document.getElementById("up-pomodoro"),
    downButton: document.getElementById("down-pomodoro"),
    modeButton: document.getElementById("pomodoro-button"),
    time: document.getElementById("pomodoro-time")
  },
  break: {
    upButton: document.getElementById("up-break"),
    downButton: document.getElementById("down-break"),
    modeButton: document.getElementById("break-button"),
    time: document.getElementById("break-time")
  }
}

let chosenMode = "pomodoro"; // default mode    

let minutes = 25;
let seconds = 0;
updateTimer();  // innitial time

let countDown;

function updateTimer() {
  timer.textContent = `${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  switch (chosenMode) {
    case "pomodoro":
      document.title = `(${timer.textContent}) Pomodoro`;
      break;
    case "break":
      document.title = `(${timer.textContent}) Break`;
      break;
  }
}

function resetButtonText() {
  playButtons.start.textContent = "Start";
  playButtons.stop.textContent = "Stop";
  playButtons.reset.textContent = "Reset";
}

function pomodoroMode() {
  resetButtonText();

  chosenMode = "pomodoro";

  clearInterval(countDown);
  countDown = false;

  minutes = settings.pomodoro.time.textContent;
  seconds = 0;

  updateTimer();

  console.log("pomodoro");
}

function breakMode() {
  resetButtonText();

  chosenMode = "break";

  clearInterval(countDown);
  countDown = false;

  minutes = settings.break.time.textContent;
  seconds = 0;

  updateTimer();

  console.log("break");
}

settings.pomodoro.modeButton.addEventListener("click", pomodoroMode);
settings.break.modeButton.addEventListener("click", breakMode);

playButtons.start.addEventListener("click", function () {
  playButtons.start.textContent = "Started";
  playButtons.stop.textContent = "Stop";

  if (!countDown) {
    countDown = setInterval(function () {
      if (timer.textContent === "00:00") {
        console.log(chosenMode)
        if (chosenMode === "break") {
          pomodoroMode();
        } else if (chosenMode === "pomodoro") {
          breakMode();
        }
        return;
      }

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

  switch (chosenMode) {
    case "pomodoro":
      minutes = settings.pomodoro.time.textContent;
      break;
    case "break":
      minutes = settings.break.time.textContent;
      break;
  }
  seconds = 0;

  updateTimer();

  console.log("reset");
});