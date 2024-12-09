const skater = document.querySelector('.skater');
const gracz = document.getElementById('gracz');
const obstacle = document.querySelector('.obstacle');
const scoreDisplay = document.querySelector('.score');
const bestScoreDisplay = document.querySelector('.best-score');  
let score = 0;
let isJumping = false;
let isGameOver = false;
let obstaclePassed = false;
let bestScore = localStorage.getItem('bestScore') || 0;  
let obstacleSpeedMultiplier = 1;  // Mnożnik prędkości przeszkód (domyślnie normalny)

bestScoreDisplay.textContent = `Najlepszy wynik: ${bestScore}`;

function jump() {
    if (isJumping || isGameOver) return;
    isJumping = true;
    gracz.src = 'jazda.gif';
    let jumpHeight = 0;
    const upInterval = setInterval(() => {
        if (jumpHeight >= 200) {  // Mniejsza wysokość skoku
            clearInterval(upInterval);
            const downInterval = setInterval(() => {
                if (jumpHeight <= 0) {
                    clearInterval(downInterval);
                    isJumping = false;
                    skater.style.bottom = '50px'; 
                    gracz.src = 'jazda.jpg';
                }
                jumpHeight -= 8;  
                skater.style.bottom = `${50 + jumpHeight}px`;  
            }, 20);
        }
        jumpHeight += 8;  
        skater.style.bottom = `${50 + jumpHeight}px`;  
    }, 20);
}

function moveObstacle() {
    let obstaclePosition = 800;
    const obstacleInterval = setInterval(() => {
        if (isGameOver) {
            clearInterval(obstacleInterval);
            return;
        }
        obstaclePosition -= 4 * obstacleSpeedMultiplier;  // Prędkość przeszkody zależna od trudności
        obstacle.style.left = `${obstaclePosition}px`;

        const skaterBottom = parseInt(window.getComputedStyle(skater).bottom);
        if (obstaclePosition < 100 && obstaclePosition > 50 && skaterBottom <= 50) {
            isGameOver = true;
            if (score > bestScore) {
                bestScore = score;
                localStorage.setItem('bestScore', bestScore);
            }
            score = 0;
            scoreDisplay.textContent = `Punkty: ${score}`;
            obstaclePosition = 800; 
            obstaclePassed = false;
            isGameOver = false;
            bestScoreDisplay.textContent = `Najlepszy wynik: ${bestScore}`;  
        }
        if (obstaclePosition < 50 && !obstaclePassed) {
            obstaclePassed = true;
            score++;
            scoreDisplay.textContent = `Punkty: ${score}`;
        }
        if (obstaclePosition <= -50) {
            obstaclePosition = 800;
            obstaclePassed = false; 
        }
    }, 20);
}

// Obsługuje przyciski trudności
const easyBtn = document.getElementById('easyBtn');
const normalBtn = document.getElementById('normalBtn');
const hardBtn = document.getElementById('hardBtn');

easyBtn.addEventListener('click', () => {
    obstacleSpeedMultiplier = 1; 
});

normalBtn.addEventListener('click', () => {
    obstacleSpeedMultiplier = 2; 
});

hardBtn.addEventListener('click', () => {
    obstacleSpeedMultiplier = 3;
});

const gameButton = document.getElementById('gameButton');
const gameContainer = document.getElementById('gameContainer');
const difficultyButtons = document.querySelector('.difficulty');

gameButton.addEventListener('click', () => {
    gameContainer.style.display = 'block';  // Pokaż grę
    gameButton.style.display = 'none';  // Ukryj przycisk startowy
    difficultyButtons.style.display = 'block';  // Pokaż przyciski trudności
});

document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        jump();
    }
});

moveObstacle(); // Rozpocznij poruszanie przeszkody
