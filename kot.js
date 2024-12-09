const kotImg = document.getElementById('kot-img');

kotImg.addEventListener('click', () => {
    if (kotImg.src.includes('kots.png')) {
        kotImg.src = 'kotjazda.jpg'; 
        kotImg.addEventListener('load', () => {
            setTimeout(() => {
                kotImg.src = 'kots.png'; 
            }, 2700); 
        });
    }
});
