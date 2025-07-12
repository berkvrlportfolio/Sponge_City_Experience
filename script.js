const videos = [
  'videos/video1.mp4',
  'videos/video2.mp4',
  'videos/video3.mp4',
  'videos/video4.mp4'
];


let currentVideo = 0;
const videoEl = document.getElementById('video');

function playVideo(index) {
  videoEl.src = videos[index];
  videoEl.classList.remove('hidden');
  videoEl.play();
}

function playNext() {
  if (currentVideo < videos.length - 1) {
    currentVideo++;
    playVideo(currentVideo);
  } else {
    videoEl.classList.add('hidden');
    document.querySelector('.skip-button').classList.add('hidden');
    document.querySelector('.question').classList.remove('hidden');
  }
}

videoEl.onended = playNext;

function handleConsent(consent) {
  document.querySelector('.question').classList.add('hidden');
  if (!consent) {
    document.querySelector('.thank-you').classList.remove('hidden');
  } else {
    document.querySelector('.form-container').classList.remove('hidden');
  }
}

function submitForm(event) {
  event.preventDefault();
  const name = document.getElementById('name').value;
  const surname = document.getElementById('surname').value;
  const insta = document.getElementById('insta').value;

  const entry = { name, surname, insta };
  const entries = JSON.parse(localStorage.getItem('entries') || '[]');
  entries.push(entry);
  localStorage.setItem('entries', JSON.stringify(entries));

  resetFlow();
}

function resetFlow() {
  currentVideo = 0;
  document.querySelector('.form-container').classList.add('hidden');
  document.querySelector('.thank-you').classList.remove('hidden');
  setTimeout(() => {
    document.querySelector('.thank-you').classList.add('hidden');
    document.querySelector('.skip-button').classList.remove('hidden');
    playVideo(currentVideo);
  }, 2000);
}

playVideo(currentVideo);
