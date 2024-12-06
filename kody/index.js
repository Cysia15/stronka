document.querySelector('.gb1').addEventListener('click', function () {
    window.location.href = 'podstrona.html'; 
});

document.querySelector('.gb2').addEventListener('click', function () {
    window.location.href = 'p2.html'; 
});

document.querySelector('.gb3').addEventListener('click', function () {
    window.location.href = 'p3.html'; 
});
const hoverSound = new Audio('swoosh.mp3'); 

function playHoverSound() {
    hoverSound.currentTime = 0; // 
    hoverSound.play().catch((error) => {
        console.error("Nie można odtworzyć dźwięku:", error);
    });
}

document.querySelector('.gb1').addEventListener('mouseenter', playHoverSound);
document.querySelector('.gb3').addEventListener('mouseenter', playHoverSound);
document.querySelector('.gb0').addEventListener('mouseenter', playHoverSound);