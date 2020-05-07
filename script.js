const timer = document.getElementById("timer");

const alarm = new Audio("alarm/alarm.mp3");

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
  playButtons.stop.textContent = "Stopped";
  playButtons.reset.textContent = "Reset";
}

function stopCountDown() {
  clearInterval(countDown);
  countDown = false;
}

function pomodoroMode() {
  resetButtonText();

  chosenMode = "pomodoro";

  modeColor();

  stopCountDown();

  minutes = settings.pomodoro.time.textContent;
  seconds = 0;

  updateTimer();

  console.log("pomodoro");
}

function modeColor() {
  switch (chosenMode) {
    case "break":
      document.querySelector('link').href = 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Small-dark-green-circle.svg/600px-Small-dark-green-circle.svg.png';
      document.querySelector('main').classList.add('break-color-border');
      for (button of document.querySelectorAll('button')) {
        button.classList.add('break-color');
      }
      break;
    case "pomodoro":
      document.querySelector('link').href = 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Red_circle.svg/1200px-Red_circle.svg.png';
      document.querySelector('main').classList.remove('break-color-border');
      for (button of document.querySelectorAll('button')) {
        button.classList.remove('break-color');
      }
      break;
  }
}

function breakMode() {
  resetButtonText();

  chosenMode = "break";

  modeColor();

  stopCountDown();

  minutes = settings.break.time.textContent;
  seconds = 0;

  updateTimer();

  console.log("break");
}

settings.pomodoro.modeButton.addEventListener("click", pomodoroMode);
settings.break.modeButton.addEventListener("click", breakMode);

settings.pomodoro.upButton.addEventListener("click", function () {
  if (settings.pomodoro.time.textContent > 59) {
    return;
  }

  settings.pomodoro.time.textContent++;
  if (chosenMode === "pomodoro") {
    minutes = settings.pomodoro.time.textContent;
    updateTimer();
  }
});

settings.pomodoro.downButton.addEventListener("click", function () {
  if (settings.pomodoro.time.textContent < 2) {
    return;
  }

  settings.pomodoro.time.textContent--;
  if (chosenMode === "pomodoro") {
    minutes = settings.pomodoro.time.textContent;
    updateTimer();
  }
});

settings.break.upButton.addEventListener("click", function () {
  if (settings.break.time.textContent > 59) {
    return;
  }

  settings.break.time.textContent++;
  if (chosenMode === "break") {
    minutes = settings.break.time.textContent;
    updateTimer();
  }
});

settings.break.downButton.addEventListener("click", function () {
  if (settings.break.time.textContent < 2) {
    return;
  }

  settings.break.time.textContent--;
  if (chosenMode === "break") {
    minutes = settings.break.time.textContent;
    updateTimer();
  }
});

playButtons.start.addEventListener("click", function () {
  playButtons.start.textContent = "Started";
  playButtons.stop.textContent = "Stop";

  if (!countDown) {
    countDown = setInterval(function () {
      if (timer.textContent === "00:00") {
        alarm.play();
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

  stopCountDown();

  console.log("stop");
});

playButtons.reset.addEventListener("click", function () {
  playButtons.start.textContent = "Start";
  playButtons.stop.textContent = "Stop";

  stopCountDown();

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