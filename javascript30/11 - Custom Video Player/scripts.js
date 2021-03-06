/*Get Our Elements */
const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");
const toggle = player.querySelector(".toggle");
const skipButtons = player.querySelectorAll("[data-skip]");
const ranges = player.querySelectorAll(".player__slider");
const fullscreenButton = player.querySelector("button:last-child");

/* Build out functions */
function togglePlay() {
  // (1)
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }

  // (2)
  // const method = video.paused ? 'play' : 'pause';
  // video[method]();
}

function updateButton() {
  toggle.textContent = this.paused ? "►" : "❚ ❚";
}

function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
  video[this.name] = this.value;
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

function handleKeydown(e) {
  let volume;
  switch (e.keyCode) {
    case 32:
      togglePlay();
      updateButton();
      break;
    case 37:
      video.currentTime -= 10;
      break;
    case 39:
      video.currentTime += 25;
      break;
    case 38:
      volume = video.volume;
      video.volume = volume > 0.95 ? 1 : volume + 0.05;
      ranges[0].value = video.volume;
      break;
    case 40:
      volume = video.volume;
      video.volume = volume < 0.05 ? 0 : volume - 0.05;
      ranges[0].value = video.volume;
      break;
    case 70:
      handleFullscreen();
      break;
    default:
      break;
  }
}

function handleFullscreen() {
  if (!document.fullscreenElement) {
    player.requestFullscreen();
    fullscreenButton.textContent = "] [";
  } else {
    document.exitFullscreen();
    fullscreenButton.textContent = "[ ]";
  }
}

/* Hook up the event listeners */
video.addEventListener("click", togglePlay);
video.addEventListener("play", updateButton);
video.addEventListener("pause", updateButton);
video.addEventListener("timeupdate", handleProgress);

toggle.addEventListener("click", togglePlay);

skipButtons.forEach((button) => button.addEventListener("click", skip));

ranges.forEach((range) => range.addEventListener("change", handleRangeUpdate));
ranges.forEach((range) =>
  range.addEventListener("mousemove", handleRangeUpdate)
);

let mousedown = false;
progress.addEventListener("click", scrub);
progress.addEventListener("mousemove", (e) => mousedown && scrub(e));
progress.addEventListener("mousedown", () => (mousedown = true));
progress.addEventListener("mouseup", () => (mousedown = false));

fullscreenButton.addEventListener("click", handleFullscreen);

document.addEventListener("keydown", handleKeydown);
