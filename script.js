let totalSeconds = 0;
let interval;
const display = document.getElementById("display");
const message = document.getElementById("message");
const alarmSound = document.getElementById("alarm-sound");

function formatTime(seconds) {
  const hrs = String(Math.floor(seconds / 3600)).padStart(2, '0');
  const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
  const secs = String(seconds % 60).padStart(2, '0');
  return `${hrs}:${mins}:${secs}`;
}

function startTimer() {
  if (interval) clearInterval(interval);
  const hours = parseInt(document.getElementById("hours").value) || 0;
  const minutes = parseInt(document.getElementById("minutes").value) || 0;
  const seconds = parseInt(document.getElementById("seconds").value) || 0;

  totalSeconds = hours * 3600 + minutes * 60 + seconds;
  if (totalSeconds <= 0) return;

  display.textContent = formatTime(totalSeconds);
  message.textContent = "";

  interval = setInterval(() => {
    totalSeconds--;
    display.textContent = formatTime(totalSeconds);

    if (totalSeconds <= 0) {
      clearInterval(interval);
      message.textContent = "Time's Up!";
      playAlarm();
    }
  }, 1000);
}

function resetTimer() {
  clearInterval(interval);
  totalSeconds = 0;
  display.textContent = "00:00:00";
  message.textContent = "";
  document.getElementById("hours").value = "";
  document.getElementById("minutes").value = "";
  document.getElementById("seconds").value = "";
  alarmSound.pause();
  alarmSound.currentTime = 0;
}

function playAlarm() {
  let count = 0;
  const alarmInterval = setInterval(() => {
    alarmSound.play();
    count++;
    if (count >= 5) clearInterval(alarmInterval); // Play 5 times (5 seconds)
  }, 1000);
}
