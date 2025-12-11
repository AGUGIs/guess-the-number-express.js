let secretNumber = Math.floor(Math.random() * 100) + 1;
let attemptsLeft = 7;
let gameOver = false;

const userGuessInput = document.getElementById('userGuess');
const submitButton = document.getElementById('submitGuess');
const messageDiv = document.getElementById('message');
const attemptsDiv = document.getElementById('attempts');
const restartButton = document.getElementById('restart');

function updateAttemptsDisplay() {
  attemptsDiv.textContent = `Осталось попыток: ${attemptsLeft}`;
}

function showMessage(text, color, animate = false) {
  messageDiv.textContent = text;
  messageDiv.style.color = color;
  messageDiv.classList.remove('show');
  setTimeout(() => {
    messageDiv.classList.add('show');
    if (animate) {
      messageDiv.classList.add('success-animation');
    }
  }, 10);
}

function checkGuess() {
  if (gameOver) return;

  const userGuess = parseInt(userGuessInput.value);

  if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
    showMessage('⚠️ Введи число от 1 до 100!', '#ff9800');
    return;
  }

  attemptsLeft--;

  if (userGuess === secretNumber) {
    showMessage('🎉 УРА! Ты угадал число!', '#4caf50', true);
    gameOver = true;
    restartButton.style.display = 'inline-block';
    document.body.style.background = 'linear-gradient(135deg, #4CAF50 0%, #8BC34A 100%)';
  } else if (attemptsLeft === 0) {
    showMessage(`💀 К сожалению, ты проиграл... Загаданное число было: ${secretNumber}`, '#f44336');
    gameOver = true;
    restartButton.style.display = 'inline-block';
    document.body.style.background = 'linear-gradient(135deg, #f44336 0%, #ff9800 100%)';
  } else if (userGuess < secretNumber) {
    showMessage('🔺 Слишком мало! Попробуй больше.', '#2196F3');
  } else {
    showMessage('🔻 Слишком много! Попробуй меньше.', '#2196F3');
  }

  updateAttemptsDisplay();
  userGuessInput.value = '';
  userGuessInput.focus();

  setTimeout(() => {
    messageDiv.classList.remove('success-animation');
  }, 1000);
}

submitButton.addEventListener('click', checkGuess);

userGuessInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    checkGuess();
  }
});

restartButton.addEventListener('click', () => {
  secretNumber = Math.floor(Math.random() * 100) + 1;
  attemptsLeft = 7;
  gameOver = false;
  messageDiv.textContent = '';
  messageDiv.classList.remove('show', 'success-animation');
  restartButton.style.display = 'none';
  updateAttemptsDisplay();
  userGuessInput.value = '';
  userGuessInput.focus();
  document.body.style.background = 'linear-gradient(135deg, #6a11cb 0%, #2575fc 50%, #00c6ff 100%)';
});

updateAttemptsDisplay();
userGuessInput.focus();
