const form = document.querySelector('#playtime-form');
const minInput = document.querySelector('#playtime-min');
const secInput = document.querySelector('#playtime-sec');

const timeText = document.querySelector('#total-time');
timeText.textContent = "00:00:00";

const videoContainer = document.querySelector('.list-wrapper');
const videoList = document.querySelector('#video-list');

let totalHour = 0, totalMin = 0, totalSec = 0;
let curMin = 0, curSec = 0;

function timePadding(time) {
  return time.toString().padStart(2, 0);
}

function setTime(e) {
  if (e.currentTarget.id === 'playtime-min') {
    curMin = parseInt(e.target.value, 10) || 0;
  } else {
    curSec = parseInt(e.target.value, 10) || 0;
  }
}

function addVideoItem(min, sec) {
  const li = document.createElement('li');
  li.textContent = `${timePadding(min)}:${timePadding(sec)}`;
  videoList.appendChild(li);
  videoContainer.scrollTop = videoList.querySelector(":last-child").offsetTop;
}

function setTotalTime(e) {
  e.preventDefault();
  if (curMin === 0 && curSec === 0) return;
  
  totalMin += curMin;
  totalSec += curSec;
  addVideoItem(curMin, curSec);

  if (totalSec >= 60) {
    totalSec -= 60;
    totalMin += 1;
  }

  if (totalMin >= 60) {
    totalMin -= 60;
    totalHour += 1;
  }

  timeText.textContent = `${timePadding(totalHour)}:${timePadding(totalMin)}:${timePadding(totalSec)}`
  minInput.value = '';
  secInput.value = '';
  curMin = 0;
  curSec = 0;
  minInput.focus();
}

minInput.addEventListener('change', setTime);
secInput.addEventListener('change', setTime);
form.addEventListener('submit', setTotalTime);
