const messageElement = document.getElementById("msg");

const randomNumber = getRandomNumber();
let attempts = 0;

function syncScore() {
  if (window.GameHub) {
    const value = Math.max(0, 20 - attempts);
    const { setStageScore, recordScore } = window.GameHub;
    if (typeof setStageScore === 'function') setStageScore(value);
    if (typeof recordScore === 'function') recordScore('speak-number', value, 'best');
  }
}

window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new window.SpeechRecognition();
recognition.start();

function getRandomNumber() {
  return Math.floor(Math.random() * 100) + 1;
}

function onSpeak(event) {
  const message = event.results[0][0].transcript;
  writeMessage(message);
  checkNumber(message);
}

function writeMessage(message) {
  messageElement.innerHTML = `
    <div>You said: </div>
    <span class="box">${message}</span>
  `;
}

function checkNumber(message) {
  const number = +message;
  if (Number.isNaN(number)) {
    messageElement.innerHTML += "<div>That is not a valid number</div>";
    return;
  }
  if (number > 100 || number < 1) {
    messageElement.innerHTML += "<div>Number must be between 1 and 100</div>";
    return;
  }
  attempts += 1;
  syncScore();
  if (number === randomNumber) {
    recognition.removeEventListener("result", onSpeak);
    recognition.stop();
    messageElement.innerHTML = `
      <div>Congrats! You have guessed the number! 🎉 It was ${number}.</div>
      <button class="play-again" id="play-again">Play Again</button>
    `;
    document
      .getElementById("play-again")
      .addEventListener("click", () => window.location.reload());
    return;
  } else if (number > randomNumber) {
    messageElement.innerHTML += "<div>GO LOWER</div>";
  } else {
    messageElement.innerHTML += "<div>GO HIGHER</div>";
  }
}

// Event Listeners
recognition.addEventListener("result", onSpeak);
recognition.addEventListener("end", () => {
  if (attempts === 0 || attempts < 20) {
    recognition.start();
  }
});

syncScore();
