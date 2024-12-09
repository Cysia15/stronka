// Elementy gry
const skater = document.querySelector('.skater');
const gracz = document.getElementById('gracz');
const obstacle = document.querySelector('.obstacle');
const scoreDisplay = document.querySelector('.score');
const bestScoreDisplay = document.querySelector('.best-score');  

// Zmienne do gry
let score = 0;
let isJumping = false;
let isGameOver = false;
let obstaclePassed = false;
let bestScore = localStorage.getItem('bestScore') || 0;  

bestScoreDisplay.textContent = `Najlepszy wynik: ${bestScore}`;

// Funkcja do skoku gracza
function jump() {
    if (isJumping || isGameOver) return;
    isJumping = true;

    // Zmiana obrazu na GIF przy skoku
    gracz.src = 'jazda.gif';

    let jumpHeight = 0;
    const upInterval = setInterval(() => {
        if (jumpHeight >= 160) {  // Mniejsza wysokość skoku
            clearInterval(upInterval);
            const downInterval = setInterval(() => {
                if (jumpHeight <= 0) {
                    clearInterval(downInterval);
                    isJumping = false;
                    skater.style.bottom = '50px'; // Ustawiamy gracza na dole po skoku

                    // Przywrócenie obrazu po zakończeniu skoku
                    gracz.src = 'jazda.jpg';
                }
                jumpHeight -= 6;  // Mniejsza prędkość opadania
                skater.style.bottom = `${50 + jumpHeight}px`;  
            }, 20);
        }
        jumpHeight += 6;  // Mniejsza prędkość skoku
        skater.style.bottom = `${50 + jumpHeight}px`;  
    }, 20);
}

// Funkcja do przesuwania przeszkody
function moveObstacle() {
    let obstaclePosition = 800;

    const obstacleInterval = setInterval(() => {
        if (isGameOver) {
            clearInterval(obstacleInterval);
            return;
        }
        obstaclePosition -= 4;  // Mniejsza prędkość przesuwania przeszkody
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

// Obsługuje kliknięcie w przycisk, aby pokazać grę
const gameButton = document.getElementById('gameButton');
const gameContainer = document.getElementById('gameContainer');

gameButton.addEventListener('click', () => {
    gameContainer.style.display = 'block'; // Pokazanie kontenera z grą
    gameButton.style.display = 'none'; // Ukrycie przycisku po kliknięciu
});

// Start gry
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        jump();
    }
});

moveObstacle();
