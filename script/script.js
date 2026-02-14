// Menú móvil
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
        navLinks.classList.toggle("active");
    });
}

// Cerrar menú al hacer clic en un enlace en móvil
document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
        if (window.innerWidth <= 768 && navLinks) {
            navLinks.classList.remove("active");
        }
    });
});

// Efecto de header al hacer scroll
window.addEventListener("scroll", function () {
    const nav = document.querySelector(".main-nav");
    if (nav) {
        if (window.scrollY > 100) {
            nav.style.backgroundColor = "rgba(44, 62, 80, 0.9)";
            nav.style.padding = "15px 0";
        } else {
            nav.style.backgroundColor = "transparent";
            nav.style.padding = "20px 0";
        }
    }
});

window.addEventListener("scroll", function () {
    const nav = document.querySelector(".main-nav");
    if (nav) {
        if (window.scrollY > 100) {
            nav.classList.add("fixed");
        } else {
            nav.classList.remove("fixed");
        }
    }
});

// Marcar enlace activo en el menú según la página actual
document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage) {
            link.classList.add('active');
        } else if (currentPage === '' || currentPage === 'index.html') {
            if (linkHref === 'index.html') {
                link.classList.add('active');
            }
        }
    });
});

// Popups para servicios
document.addEventListener('DOMContentLoaded', function() {
    const serviceCards = document.querySelectorAll('.service-card');
    const overlay = document.getElementById('popupOverlay');
    
    // Popups por ID
    const popupAdultos = document.getElementById('popupAdultos');
    const popupAdolescentes = document.getElementById('popupAdolescentes');
    const popupTalleres = document.getElementById('popupTalleres');
    
    // Abrir popup según el servicio
    serviceCards.forEach(card => {
        card.addEventListener('click', function() {
            const service = this.getAttribute('data-service');
            
            // Cerrar cualquier popup abierto
            closeAllPopups();
            
            // Abrir el popup correspondiente
            if (service === 'adultos' && popupAdultos) {
                popupAdultos.classList.add('active');
                overlay.classList.add('active');
                document.body.style.overflow = 'hidden';
            } else if (service === 'adolescentes' && popupAdolescentes) {
                popupAdolescentes.classList.add('active');
                overlay.classList.add('active');
                document.body.style.overflow = 'hidden';
            } else if (service === 'talleres' && popupTalleres) {
                popupTalleres.classList.add('active');
                overlay.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    // Función para cerrar todos los popups
    function closeAllPopups() {
        const popups = document.querySelectorAll('.popup-container');
        popups.forEach(popup => {
            popup.classList.remove('active');
        });
        
        if (overlay) {
            overlay.classList.remove('active');
        }
        
        document.body.style.overflow = 'auto';
    }
    
    // Cerrar al hacer clic en el botón X
    document.querySelectorAll('.popup-close').forEach(btn => {
        btn.addEventListener('click', closeAllPopups);
    });
    
    // Cerrar al hacer clic en el overlay
    if (overlay) {
        overlay.addEventListener('click', closeAllPopups);
    }
    
    // Cerrar con tecla ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeAllPopups();
        }
    });
});
// Carrusel de comentarios
document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.comentarios-carrusel-track');
    const slides = document.querySelectorAll('.comentario-carrusel-slide');
    const prevBtn = document.querySelector('.comentarios-prev-btn');
    const nextBtn = document.querySelector('.comentarios-next-btn');
    const dots = document.querySelectorAll('.comentarios-dot');
    
    if (!track || slides.length === 0) return;
    
    let currentIndex = 0;
    let slidesPerView = window.innerWidth <= 768 ? 1 : 2;
    const totalSlides = slides.length;
    const maxIndex = Math.ceil(totalSlides / slidesPerView) - 1;
    
    function updateCarousel() {
        const slideWidth = slides[0].offsetWidth + 30; // incluye gap
        track.style.transform = `translateX(-${currentIndex * slideWidth * slidesPerView}px)`;
        
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });
    }
    
    function nextSlide() {
        if (currentIndex < maxIndex) {
            currentIndex++;
        } else {
            currentIndex = 0;
        }
        updateCarousel();
    }
    
    function prevSlide() {
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = maxIndex;
        }
        updateCarousel();
    }
    
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);
    
    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            currentIndex = i;
            updateCarousel();
        });
    });
    
    window.addEventListener('resize', () => {
        slidesPerView = window.innerWidth <= 768 ? 1 : 2;
        updateCarousel();
    });
    
    updateCarousel();
});

// Funcionalidad Leer más en comentarios
document.addEventListener('DOMContentLoaded', function() {
    const leerMasBotones = document.querySelectorAll('.leer-mas-btn');
    
    leerMasBotones.forEach(boton => {
        boton.addEventListener('click', function() {
            const cuerpo = this.closest('.comentario-carrusel-cuerpo');
            const textoCorto = cuerpo.querySelector('.texto-corto');
            const textoCompleto = cuerpo.querySelector('.texto-completo');
            
            if (textoCorto.style.display !== 'none') {
                textoCorto.style.display = 'none';
                textoCompleto.style.display = 'inline';
                this.textContent = 'Leer menos';
            } else {
                textoCorto.style.display = 'inline';
                textoCompleto.style.display = 'none';
                this.textContent = 'Leer más';
            }
        });
    });
});