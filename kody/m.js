document.querySelector('.gb2').addEventListener('click', function () {
    window.location.href = 'p2.html'; 
});
document.querySelector('.gb3').addEventListener('click', function () {
    window.location.href = 'p3.html'; 
});
document.querySelector('.gb0').addEventListener('click', function () {
    window.location.href = 'main.html'; 
});
const hoverSound = new Audio('swoosh.mp3'); 

function playHoverSound() {
    hoverSound.currentTime = 0; // 
    hoverSound.play().catch((error) => {
        console.error("Nie można odtworzyć dźwięku:", error);
    });
}

document.querySelector('.gb2').addEventListener('mouseenter', playHoverSound);
document.querySelector('.gb3').addEventListener('mouseenter', playHoverSound);
document.querySelector('.gb0').addEventListener('mouseenter', playHoverSound);