let workDuration = document.getElementById('work-duration').value * 60;
let breakDuration = document.getElementById('break-duration').value * 60;
let time = workDuration;
let timerInterval;

const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const alarmSound = document.getElementById('alarm-sound');

function updateDisplay() {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;
    minutesDisplay.textContent = minutes < 10 ? '0' + minutes : minutes;
    secondsDisplay.textContent = seconds < 10 ? '0' + seconds : seconds;
}

function startTimer() {
    if (timerInterval) return;
    timerInterval = setInterval(() => {
        time--;
        updateDisplay();
        if (time <= 0) {
            alarmSound.play();
            clearInterval(timerInterval);
            timerInterval = null;
            time = time === workDuration ? breakDuration : workDuration;
            startTimer();
        }
    }, 1000);
}

function pauseTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
}

function resetTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
    time = workDuration;
    updateDisplay();
}

document.getElementById('start').addEventListener('click', startTimer);
document.getElementById('pause').addEventListener('click', pauseTimer);
document.getElementById('reset').addEventListener('click', resetTimer);
document.getElementById('work-duration').addEventListener('input', function() {
    workDuration = this.value * 60;
    if (!timerInterval) time = workDuration;
    updateDisplay();
});
document.getElementById('break-duration').addEventListener('input', function() {
    breakDuration = this.value * 60;
});
