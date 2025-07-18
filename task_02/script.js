let [hours, minutes, seconds] = [0, 0, 0];
let display = document.getElementById("display");
let timer = null;
let lapsList = document.getElementById("laps");

function updateTime() {
  seconds++;
  if (seconds == 60) {
    seconds = 0;
    minutes++;
    if (minutes == 60) {
      minutes = 0;
      hours++;
    }
  }
  display.innerText = 
    `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function start() {
  if (timer !== null) return;
  timer = setInterval(updateTime, 1000);
}

function pause() {
  clearInterval(timer);
  timer = null;
}

function reset() {
  pause();
  [hours, minutes, seconds] = [0, 0, 0];
  display.innerText = "00:00:00";
  lapsList.innerHTML = "";
}

function lap() {
  if (timer === null) return;
  const lapTime = display.innerText;
  const li = document.createElement("li");
  li.textContent = `Lap: ${lapTime}`;
  lapsList.appendChild(li);
}
