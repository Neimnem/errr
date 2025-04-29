const colors = ['teal', 'lightblue', 'pink', 'lightyellow'];
let simonSequence = [];
let score = 0;
let highScore = 0;
let clickable = false;
let userSequence = [];
const panels = document.querySelectorAll('.panel');
const startButton = document.getElementById('start');
const scoreDisplay = document.getElementById('score');
const highScoreDisplay = document.getElementById('high-score');
const gameOverScreen = document.getElementById('game-over');
const gameOverText = document.getElementById('game-over-text');

let flashSpeed = 400; // ⏱ Faster flash (was 600)

// Flash the panel
function flash(color) {
    const panel = document.querySelector('.' + color);
    panel.style.filter = 'brightness(1.5)';
    setTimeout(() => {
        panel.style.filter = 'brightness(1)';
    }, 250); // slightly less to feel snappy
}

// Play Simon's turn
function playSimon() {
    clickable = false;
    userSequence = [];

    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    simonSequence.push(randomColor);

    for (let i = 0; i < simonSequence.length; i++) {
        setTimeout(() => {
            flash(simonSequence[i]);
        }, i * flashSpeed);
    }

    setTimeout(() => {
        clickable = true;
    }, simonSequence.length * flashSpeed);
}

// Handle user click
function handleUserClick(e) {
    if (!clickable) return;

    const color = e.target.getAttribute('data-color');
    userSequence.push(color);

    // 🖱 Add opacity feedback
    const panel = e.target;
    panel.style.opacity = '0.5';
    setTimeout(() => {
        panel.style.opacity = '1';
    }, 150);

    for (let i = 0; i < userSequence.length; i++) {
        if (userSequence[i] !== simonSequence[i]) {
            endGame();
            return;
        }
    }

    score++;
    updateScore();

    if (userSequence.length === simonSequence.length) {
        setTimeout(() => {
            playSimon();
        }, 1000);
    }
}

// Update score
function updateScore() {
    scoreDisplay.innerHTML = "Score: " + score;
    scoreDisplay.style.transition = "color 0.3s";
    scoreDisplay.style.color = "yellow";
    setTimeout(() => {
        scoreDisplay.style.color = "white";
    }, 300);

    if (score > highScore) {
        highScore = score;
        highScoreDisplay.innerHTML = "High Score: " + highScore;
    }
}

// End game
function endGame() {
    clickable = false;
    gameOverText.innerHTML = `Game Over<br>Final Score: ${score}<br>High Score: ${highScore}`;
    gameOverScreen.style.display = 'flex';
}

// Reset game
function resetGame() {
    simonSequence = [];
    userSequence = [];
    score = 0;
    clickable = false;
    updateScore();
}

// Event listeners
document.getElementById('play-again').addEventListener('click', () => {
    resetGame();
    gameOverScreen.style.display = 'none';
    playSimon();
});

startButton.addEventListener('click', () => {
    resetGame();
    playSimon();
});

panels.forEach(panel => {
    panel.addEventListener('click', handleUserClick);
});
