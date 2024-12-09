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
bestScoreDisplay.textContent = `Najlepszy wynik: ${bestScore}`;
function jump() {
    if (isJumping || isGameOver) return;
    isJumping = true;
    gracz.src = 'jazda.gif';
    let jumpHeight = 0;
    const upInterval = setInterval(() => {
        if (jumpHeight >= 160) {  // Mniejsza wysokość skoku
            clearInterval(upInterval);
            const downInterval = setInterval(() => {
                if (jumpHeight <= 0) {
                    clearInterval(downInterval);
                    isJumping = false;
                    skater.style.bottom = '50px'; 
                    gracz.src = 'jazda.jpg';
                }
                jumpHeight -= 6;  
                skater.style.bottom = `${50 + jumpHeight}px`;  
            }, 20);
        }
        jumpHeight += 6;  
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
        obstaclePosition -= 4; 
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
const gameButton = document.getElementById('gameButton');
const gameContainer = document.getElementById('gameContainer');

gameButton.addEventListener('click', () => {
    gameContainer.style.display = 'block'; 
    gameButton.style.display = 'none'; 
});
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        jump();
    }
});

moveObstacle();
