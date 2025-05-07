
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

document.addEventListener('DOMContentLoaded', function() {
    const desaparecerLogo = document.querySelector('.btn__nav');
    const logo = document.querySelector('#ocultar-img');

    desaparecerLogo.addEventListener('click', () => {
        logo.classList.toggle('ocultar');
    });
});

/************ BOTON MENÚ CLARO-OSCURO *******************/
// Función para obtener el threshold dinámicamente según el ancho de la pantalla
function getResponsiveThreshold() {
    const width = window.innerWidth;
        if (width >= 1024) {
            return 0.5;
        } else if (width >= 768 && width < 1024) {
            return 0.5; 
        } else if (width >= 500 && width < 768) {
            return 0.65;
        }else {
            return 0.55; // Para pantallas más pequeñas
        }
}
const btnObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
    const btn = document.querySelector('.header__nav-logo1');
    const btn2 = document.querySelector('.header__nav-logo2');
    const btn3 = document.querySelector('.header__nav-logo3');
    if (entry.isIntersecting) {
        //boton 1
        btn.classList.remove('claro');
        btn.classList.add('oscuro');
        //boton 2
        btn2.classList.remove('claro');
        btn2.classList.add('oscuro');
        //boton 3
        btn3.classList.remove('claro');
        btn3.classList.add('oscuro');
        
        
        } else {
            //boton 1
            btn.classList.remove('oscuro');
            btn.classList.add('claro');
            //boton 2
            btn2.classList.remove('oscuro');
            btn2.classList.add('claro');
            //boton 3
            btn3.classList.remove('oscuro');
            btn3.classList.add('claro');
            
        }
    });
}, { threshold: getResponsiveThreshold() }); // el 64% del elemento debe ser visible para que se active el callback

btnObserver.observe(document.getElementById('bg__claro'));

