const navToggle = document.querySelector('.main-nav__toggle');
const mainNav = document.querySelector('.main-nav');

navToggle.addEventListener('click', function(e) {
  mainNav.classList.toggle('main-nav--closed');
  mainNav.classList.toggle('main-nav--opened');
});


//  custom video player

let videoPlayer = document.querySelector('.video__player');

let playbackLine = document.querySelector('.video__playback-line');
let playbackSlider = document.querySelector('.video__playback-slider');

let progress = 0;

let replay = document.querySelector('.video__replay');
let fullscreen = document.querySelector('.video__fullscreen');

let full = false;

replay.addEventListener('click', (e) => {
  videoPlayer.currentTime = 0;
  videoPlayer.play();
});

fullscreen.addEventListener('click', () => {

  if (!full) {
    full = true;
    videoPlayer.parentElement.requestFullscreen();
  } else {
    document.exitFullscreen();
    full = false;
  }

  requestAnimationFrame(() => {
    progress = videoPlayer.currentTime / videoPlayer.duration;

    playbackSlider.style.left = `${progress * playbackLine.offsetWidth - playbackSlider.offsetWidth}px`;
  })

});






videoPlayer.addEventListener('click', (e) => {
  if (e.target !== videoPlayer) return;
  if (videoPlayer.paused) {
    videoPlayer.play();
  } else {
    videoPlayer.pause();
  }
});

videoPlayer.addEventListener('ended', (e) => {
  videoPlayer.pause();
  videoPlayer.currentTime = 0;
});

videoPlayer.addEventListener('timeupdate', (e) => {
  progress = videoPlayer.currentTime / videoPlayer.duration;

  playbackSlider.style.left = `${progress * playbackLine.offsetWidth - playbackSlider.offsetWidth}px`;

});

playbackLine.parentElement.addEventListener('mousedown', function(e) {
  refreshPosition(e);

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});

videoPlayer.parentElement.addEventListener('keydown', (e) => {
  if (e.code == 'Space') {

    if (videoPlayer.paused) {
      videoPlayer.play();
    } else {
      videoPlayer.pause();
    }
  }
});

videoPlayer.parentElement.addEventListener('fullscreenchange', function(e) {
  if (document.fullscreenElement) return;
  full = false;
  progress = videoPlayer.currentTime / videoPlayer.duration;
  playbackSlider.style.left = `${progress * playbackLine.offsetWidth - playbackSlider.offsetWidth}px`;
});


function onMouseMove(e) {
  refreshPosition(e);
}

function onMouseUp() {
  document.removeEventListener('mousemove', onMouseMove);
  document.removeEventListener('mouseup', onMouseUp);
}

function refreshPosition(e) {
  let clickPosition = e.clientX - playbackLine.getBoundingClientRect().left;;

  let ratio = clickPosition / (playbackLine.offsetWidth - playbackSlider.offsetWidth);
  ;
  ratio = ratio > 1 ? 1 : ratio;

  videoPlayer.currentTime = ratio * videoPlayer.duration;
}




