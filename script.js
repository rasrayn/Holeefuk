
/************** NAVBAR *******************/
document.addEventListener('DOMContentLoaded', function() {
    const dropdownButton = document.querySelector('.btn__nav');
    const dropdownMenu = document.querySelector('.navbar__header');
    const overlay = document.getElementById('overlay');

    // Toggle the dropdown menu on button click
    dropdownButton.addEventListener('click', () => {
        dropdownMenu.classList.toggle('abierto');
        overlay.classList.toggle('activo');
    });
    //cerrar menú al hacer clic en el overlay
    overlay.addEventListener('click', () => {
        dropdownMenu.classList.toggle('abierto');
        overlay.classList.toggle('activo');
    });
});

