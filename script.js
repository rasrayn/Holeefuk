
/************** NAVBAR *******************/
document.addEventListener('DOMContentLoaded', function() {
    const dropdownButton = document.querySelector('.btn__nav');
    const dropdownMenu = document.querySelector('.navbar__header');
    const overlay = document.getElementById('overlay');

    // Toggle the dropdown menu on button click
    dropdownButton.addEventListener('click', () => {
        dropdownMenu.classList.toggle('abierto');
        overlay.classList.toggle('activo');
        overlay.dataset.context = 'menu';
    });
    //cerrar menú al hacer clic en el overlay
    overlay.addEventListener('click', (e) => {
        if (overlay.dataset.context === 'menu') {
            dropdownMenu.classList.remove('abierto');
            overlay.classList.remove('activo');
            overlay.dataset.context = '';
        }else if (overlay.classList.contains('activo-lightbox')){
            overlay.classList.remove('activo-lightbox', 'activo');
            overlay.innerHTML = '';
            ocerlay.dataset.context = '';
        }
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

//lector json y añadir wrapper mas imagen
fetch('/uploads.json')
    .then(res => res.json())
    .then(data => {
        const contenedores = {
            minimalista: document.querySelector('.tab1__content'),
            blackwork: document.querySelector('.tab2__content'),
            realismo: document.querySelector('.tab3__content'),
            neoold: document.querySelector('.tab4__content'),
            japones: document.querySelector('.tab5__content'),

        };
        const clasesContador = {
            minimalista: 9,
            blackwork: 16,
            realismo: 16,
            neoold: 21,
            japones: 5
        };
        const videoExteniones = ['.mp4', '.webm', '.mov'];

        data.forEach(archivo => {
            const tipo = archivo.tipo.toLowerCase();
            const esVideo = videoExtensiones.includes(tipo);
            const categoria = archivo.categoria;
            const contador = clasesContador[categoria]++;
            const clase = `item-${contador}__${categoria}`;

            const contenedor = contenedores[categoria];
            if(!contenedor) return;

            if (esVideo) {
                const wrapper = document.createElement('div');
                wrapper.className = `video-wrapper ${clase}`;
                wrapper.innerHTML = `
                    <img class="video-icon-overlay" src="Recursos/tocar.png.png" style = "scale: .2;"
                    <video src = "${archivo.url}" poster = "" muted style = "width: 100%; height: 100%;"></video>
                `;
                contenedor.appendChild(wrapper);
            } else {
                const img = document.createElement('img');
                img.src = archivo.url;
                img.alt = `Imagen ${contenedores} subida`;
                img.className = clase;
                img.style.width = '100%';
                img.style.height = '100%';
                contenedor.appendChild(img);
            }
        });
    })
    .catch(err => console.error('Error cargando uploads.json', err));

document.addEventListener('click', function (e) {
    const clicked = e.target;
    //detectar si es img
    if (clicked.tagName === 'IMG') {
        abrirLightbox(`<img src="${clicked.src}" style="width: 100%; height: 100%;">`);        
    }
    //detectar si es video
    if (clicked.tagName === 'VIDEO') {
        const videoURL = clicked.src;
        abrirLightbox(`
            <video src="${videoURL}" controls autoplay style="width: 100%; height:100%";>
            `)
    }

    function abrirLightbox(contenido) {
        const overlay = document.getElementById('overlay');

        //añadimos clases para activar el overlay con flexbox centrado
        overlay.classList.add('activo', 'activo-lightbox');

        //creamos contenedor para el contenido (img o vdo)
        const contentBox = document.createElement('div');
        contentBox.className ='lightbox-content';
        contentBox.innerHTML = contenido;

        //limpiar overlay antes de añadir
        overlay.innerHTML = '';
        overlay.appendChild(contentBox);
    }
});

document.getElementById('overlay').addEventListener('click', function(e) {
    if (e.target === this) {
        this.classList.remove('activo', 'activo-lightbox');
        this.innerHTML = ''; //limpia contenido
    }
})
