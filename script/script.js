// Navegación suave
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    if (targetId === "#") return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: "smooth",
      });

      // Cerrar menú móvil si está abierto
      const navLinks = document.querySelector(".nav-links");
      if (navLinks.classList.contains("active")) {
        navLinks.classList.remove("active");
      }
    }
  });
});

// Menú móvil
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// Cerrar menú al hacer clic en un enlace en móvil
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    if (window.innerWidth <= 768) {
      navLinks.classList.remove("active");
    }
  });
});

// Carrusel automático
document.addEventListener("DOMContentLoaded", function () {
  const slides = document.querySelectorAll(".carousel-slide");
  const dots = document.querySelectorAll(".dot");
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");
  let currentSlide = 0;
  let slideInterval;

  // Función para mostrar slide específico
  function goToSlide(n) {
    slides[currentSlide].classList.remove("active");
    dots[currentSlide].classList.remove("active");

    currentSlide = (n + slides.length) % slides.length;

    slides[currentSlide].classList.add("active");
    dots[currentSlide].classList.add("active");

    const slideWidth = slides[0].clientWidth;
    document.querySelector(".carousel-slides").style.transform =
      `translateX(-${currentSlide * slideWidth}px)`;
  }

  // Función para siguiente slide
  function nextSlide() {
    goToSlide(currentSlide + 1);
  }

  // Función para slide anterior
  function prevSlide() {
    goToSlide(currentSlide - 1);
  }

  // Iniciar carrusel automático
  function startCarousel() {
    slideInterval = setInterval(nextSlide, 5000);
  }

  // Detener carrusel automático
  function stopCarousel() {
    clearInterval(slideInterval);
  }

  // Eventos para botones
  nextBtn.addEventListener("click", () => {
    nextSlide();
    stopCarousel();
    startCarousel();
  });

  prevBtn.addEventListener("click", () => {
    prevSlide();
    stopCarousel();
    startCarousel();
  });

  // Eventos para dots
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      goToSlide(index);
      stopCarousel();
      startCarousel();
    });
  });

  // Pausar carrusel al pasar el mouse
  const carouselContainer = document.querySelector(".carousel-container");
  carouselContainer.addEventListener("mouseenter", stopCarousel);
  carouselContainer.addEventListener("mouseleave", startCarousel);

  // Iniciar carrusel
  startCarousel();

  // Ajustar carrusel al redimensionar ventana
  window.addEventListener("resize", function () {
    const slideWidth = slides[0].clientWidth;
    document.querySelector(".carousel-slides").style.transform =
      `translateX(-${currentSlide * slideWidth}px)`;
  });
});

// Efecto de header al hacer scroll
window.addEventListener("scroll", function () {
  const nav = document.querySelector(".main-nav");
  if (window.scrollY > 100) {
    nav.style.backgroundColor = "rgba(44, 62, 80, 0.9)";
    nav.style.padding = "15px 0";
  } else {
    nav.style.backgroundColor = "transparent";
    nav.style.padding = "20px 0";
  }
});

// Animación para elementos al hacer scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver(function (entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate");
    }
  });
}, observerOptions);

// Observar elementos para animación
document
  .querySelectorAll(
    ".info-box, .service-card, .about-image, .therapy-image, .workshop-image",
  )
  .forEach((el) => {
    observer.observe(el);
  });

// Carrusel de opiniones - SIN CONFLICTOS
document.addEventListener('DOMContentLoaded', function() {
    const opinionItems = document.querySelectorAll('.opinion-item');
    const prevBtn = document.querySelector('.opinion-anterior');
    const nextBtn = document.querySelector('.opinion-siguiente');
    const puntos = document.querySelectorAll('.opinion-punto');
    
    if (opinionItems.length === 0) return;
    
    let indiceActual = 0;
    let intervaloAuto;
    
    // Mostrar opinión específica
    function mostrarOpinion(indice) {
        if (indice < 0) {
            indice = opinionItems.length - 1;
        } else if (indice >= opinionItems.length) {
            indice = 0;
        }
        
        // Ocultar todas
        opinionItems.forEach(item => {
            item.classList.remove('mostrar');
        });
        
        // Mostrar actual
        opinionItems[indice].classList.add('mostrar');
        
        // Actualizar puntos
        puntos.forEach(punto => {
            punto.classList.remove('activo');
        });
        puntos[indice].classList.add('activo');
        
        indiceActual = indice;
    }
    
    // Siguiente opinión
    function siguienteOpinion() {
        mostrarOpinion(indiceActual + 1);
    }
    
    // Opinión anterior
    function anteriorOpinion() {
        mostrarOpinion(indiceActual - 1);
    }
    
    // Iniciar automático
    function iniciarAuto() {
        intervaloAuto = setInterval(siguienteOpinion, 5000);
    }
    
    // Detener automático
    function detenerAuto() {
        clearInterval(intervaloAuto);
    }
    
    // Event Listeners
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            anteriorOpinion();
            detenerAuto();
            iniciarAuto();
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            siguienteOpinion();
            detenerAuto();
            iniciarAuto();
        });
    }
    
    // Puntos
    puntos.forEach((punto, index) => {
        punto.addEventListener('click', function() {
            mostrarOpinion(index);
            detenerAuto();
            iniciarAuto();
        });
    });
    
    // Pausar al pasar mouse
    const contenedor = document.querySelector('.opiniones-contenedor');
    if (contenedor) {
        contenedor.addEventListener('mouseenter', detenerAuto);
        contenedor.addEventListener('mouseleave', iniciarAuto);
    }
    
    // Iniciar
    mostrarOpinion(0);
    iniciarAuto();
});








// Funcionalidad "Leer más" para testimonios
document.addEventListener('DOMContentLoaded', function() {
    const readMoreButtons = document.querySelectorAll('.read-more-btn');
    
    readMoreButtons.forEach(button => {
        button.addEventListener('click', function() {
            const testimonioBody = this.closest('.testimonio-body');
            const shortText = testimonioBody.querySelector('.short-text');
            const fullText = testimonioBody.querySelector('.full-text');
            
            if (shortText.style.display !== 'none') {
                shortText.style.display = 'none';
                fullText.style.display = 'block';
                this.textContent = 'Leer menos';
            } else {
                shortText.style.display = 'block';
                fullText.style.display = 'none';
                this.textContent = 'Leer más';
            }
        });
    });
});







// Animación de números contadores
document.addEventListener('DOMContentLoaded', function() {
    const contadores = document.querySelectorAll('.estadistica-numero');
    
    function animarContadores() {
        contadores.forEach(contador => {
            const valorFinal = parseInt(contador.getAttribute('data-count'));
            const duracion = 800; // 2 segundos
            const incremento = valorFinal / (duracion / 16); // 60fps
            
            let valorActual = 0;
            const timer = setInterval(() => {
                valorActual += incremento;
                if (valorActual >= valorFinal) {
                    valorActual = valorFinal;
                    clearInterval(timer);
                }
                contador.textContent = Math.floor(valorActual) + "+";
            }, 16);
        });
    }
    
    // Observador para animar cuando la sección es visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animarContadores();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    const estadisticasSection = document.querySelector('.estadisticas-section');
    if (estadisticasSection) {
        observer.observe(estadisticasSection);
    }
});