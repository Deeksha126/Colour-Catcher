const gameContainer = document.getElementById('game-container');
const targetColorEl = document.getElementById('targetColor');
const scoreEl = document.getElementById('score');
const hitSound = document.getElementById('hitSound');
const missSound = document.getElementById('missSound');

let score = 0;
let intervalId;
let level = 1;

const colorNames = [
    "Red", "Blue", "Green", "Yellow", "Pink", "Orange", "Purple", "Brown", "Gray"
];

function getRandomColorName() {
    return colorNames[Math.floor(Math.random() * colorNames.length)];
}

function getRandomColorCode(colorName) {
    const colors = {
        Red: "#FF0000",
        Blue: "#0000FF",
        Green: "#008000",
        Yellow: "#FFFF00",
        Pink: "#FFC0CB",
        Orange: "#FFA500",
        Purple: "#800080",
        Brown: "#A52A2A",
        Gray: "#808080"
    };
    return colors[colorName];
}

function spawnBall() {
    const ball = document.createElement('div');
    ball.classList.add('color-ball');

    const randomColorName = getRandomColorName();
    const colorCode = getRandomColorCode(randomColorName);
    ball.style.backgroundColor = colorCode;
    ball.style.top = `${Math.random() * (gameContainer.clientHeight - 50)}px`;
    ball.style.left = `${Math.random() * (gameContainer.clientWidth - 50)}px`;

    ball.addEventListener('click', () => {
        if (randomColorName === targetColorEl.textContent) {
            score += 10;
            hitSound.play();
        } else {
            score -= 5;
            missSound.play();
        }
        updateScore();
        ball.remove();
    });

    gameContainer.appendChild(ball);

    setTimeout(() => {
        if (ball.parentElement) {
            ball.remove();
        }
    }, 3000 / level);
}

function updateScore() {
    scoreEl.textContent = `Score: ${score}`;
    if (score >= 100) {
        level++;
        score = 0;
        alert('Level up! Difficulty increased!');
    } else if (score <= -15) {
        alert('Game Over!');
        stopGame();
    }
}

function startGame() {
    if (intervalId) return;
    targetColorEl.textContent = getRandomColorName();
    intervalId = setInterval(() => {
        spawnBall();
    }, 1000 / level);
}

function stopGame() {
    clearInterval(intervalId);
    intervalId = null;
}

function restartGame() {
    stopGame();
    score = 0;
    level = 1;
    updateScore();
    targetColorEl.textContent = '';
    gameContainer.innerHTML = '';
}
