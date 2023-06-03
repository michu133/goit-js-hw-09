function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const startButton = document.querySelector('button[data-start]');
const stopButton = document.querySelector('button[data-stop]');
let timerId = null;

startButton.addEventListener('click', () => {
  startButton.disabled = true;
  timerId = setInterval(() => {
    const randomColor = getRandomHexColor();
    document.body.style.backgroundColor = randomColor;
  }, 1000);
});
stopButton.addEventListener('click', () => {
  startButton.disabled = false;
  clearInterval(timerId);
});
