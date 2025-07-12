const videoEl = document.getElementById('video');
const videos = ['videos/video1.mp4'];
let currentVideo = 0;

function playVideo(index) {
  videoEl.src = videos[index];
  videoEl.classList.remove('hidden');
  videoEl.play();
}

function playNext() {
  videoEl.pause();
  videoEl.classList.add('hidden');
  document.querySelector('.skip-button').classList.add('hidden');
  document.querySelector('.question').classList.remove('hidden');
}

videoEl.onended = playNext;

function handleConsent(consent) {
  document.querySelector('.question').classList.add('hidden');
  if (!consent) {
    document.querySelector('.thank-you').classList.remove('hidden');
    setTimeout(() => {
      restartFlow();
    }, 3000);
  } else {
    document.querySelector('.form-container').classList.remove('hidden');
  }
}

function submitForm(event) {
  event.preventDefault();
  const name = document.getElementById('name').value;
  const surname = document.getElementById('surname').value;
  const insta = document.getElementById('insta').value;

  const data = { name, surname, insta };

  fetch('https://script.google.com/macros/s/AKfycbwOeJFlQhJZ45RDrGUpUOGkLrZW7qJWLL6QDtEvZhfXOCy_R3c523b-XKbGj8Gb0k6Y/exec', {
    method: 'POST',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  document.querySelector('.form-container').classList.add('hidden');
  document.querySelector('.thank-you').classList.remove('hidden');

  setTimeout(() => {
    restartFlow();
  }, 3000);
}

function restartFlow() {
  currentVideo = 0;
  document.querySelector('.thank-you').classList.add('hidden');
  document.querySelector('.skip-button').classList.remove('hidden');
  playVideo(currentVideo);
}

// Start initially
playVideo(currentVideo);
