// ===== INICIALIZACIÓN =====
document.addEventListener("DOMContentLoaded", function () {
  // Elementos del menú
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.querySelector(".nav-links");
  const dropdownTrigger = document.querySelector(".dropdown-trigger");
  const dropdown = document.querySelector(".dropdown");

  // ===== MENÚ MÓVIL =====
  if (menuToggle && navLinks) {
    // Abrir/cerrar menú con el botón hamburguesa
    menuToggle.addEventListener("click", function (e) {
      e.stopPropagation();
      navLinks.classList.toggle("active");

      // Si se cierra el menú, también cerrar dropdown
      if (!navLinks.classList.contains("active")) {
        dropdown?.classList.remove("active");
      }
    });
  }

  // ===== DROPDOWN EN MÓVIL =====
  if (dropdownTrigger && dropdown) {
    dropdownTrigger.addEventListener("click", function (e) {
      // Solo en móvil
      if (window.innerWidth <= 768) {
        e.preventDefault();
        e.stopPropagation();

        // Toggle solo el dropdown, sin afectar el menú principal
        dropdown.classList.toggle("active");
      }
    });
  }

  // ===== CERRAR MENÚ AL HACER CLIC EN UN ENLACE (excepto dropdown trigger) =====
  if (navLinks) {
    document.querySelectorAll(".nav-links a").forEach((link) => {
      link.addEventListener("click", function (e) {
        // Si es el trigger del dropdown (SERVICIOS), NO cerrar el menú
        if (this.classList.contains("dropdown-trigger")) {
          e.preventDefault(); // Evita que recargue la página
          return; // No cerrar el menú
        }

        // Para los demás enlaces, cerrar el menú en móvil
        if (window.innerWidth <= 768) {
          navLinks.classList.remove("active");
          dropdown?.classList.remove("active");
        }
      });
    });
  }

  // ===== CERRAR MENÚ AL HACER CLIC FUERA =====
  document.addEventListener("click", function (event) {
    if (window.innerWidth <= 768 && navLinks?.classList.contains("active")) {
      // Si el clic NO fue en el menú NI en el botón hamburguesa
      if (
        !navLinks.contains(event.target) &&
        !menuToggle?.contains(event.target)
      ) {
        navLinks.classList.remove("active");
        dropdown?.classList.remove("active");
      }
    }
  });

  // ===== RESTO DE FUNCIONALIDADES (sin cambios) =====

  // Efecto de header al hacer scroll
  const nav = document.querySelector(".main-nav");
  window.addEventListener("scroll", function () {
    if (nav) {
      if (window.scrollY > 100) {
        nav.style.backgroundColor = "rgb(76, 125, 158, 0.9)";
        nav.style.padding = "15px 0";
        nav.classList.add("fixed");
      } else {
        nav.style.backgroundColor = "transparent";
        nav.style.padding = "20px 0";
        nav.classList.remove("fixed");
      }
    }
  });

  // Marcar enlace activo
  const currentPage = window.location.pathname.split("/").pop();
  document.querySelectorAll(".nav-links a").forEach((link) => {
    const linkHref = link.getAttribute("href");
    if (
      linkHref === currentPage ||
      ((currentPage === "" || currentPage === "index.html") &&
        linkHref === "index.html")
    ) {
      link.classList.add("active");
    }
  });

  // Popups para servicios
  const serviceCards = document.querySelectorAll(".service-card");
  const overlay = document.getElementById("popupOverlay");
  const popupAdultos = document.getElementById("popupAdultos");
  const popupAdolescentes = document.getElementById("popupAdolescentes");
  const popupTalleres = document.getElementById("popupTalleres");

  function closeAllPopups() {
    document
      .querySelectorAll(".popup-container")
      .forEach((p) => p.classList.remove("active"));
    overlay?.classList.remove("active");
    document.body.style.overflow = "auto";
  }

  serviceCards.forEach((card) => {
    card.addEventListener("click", function () {
      const service = this.getAttribute("data-service");
      closeAllPopups();

      if (service === "adultos" && popupAdultos) {
        popupAdultos.classList.add("active");
        overlay?.classList.add("active");
        document.body.style.overflow = "hidden";
      } else if (service === "adolescentes" && popupAdolescentes) {
        popupAdolescentes.classList.add("active");
        overlay?.classList.add("active");
        document.body.style.overflow = "hidden";
      } else if (service === "talleres" && popupTalleres) {
        popupTalleres.classList.add("active");
        overlay?.classList.add("active");
        document.body.style.overflow = "hidden";
      }
    });
  });

  document
    .querySelectorAll(".popup-close")
    .forEach((btn) => btn.addEventListener("click", closeAllPopups));
  overlay?.addEventListener("click", closeAllPopups);
  document.addEventListener(
    "keydown",
    (e) => e.key === "Escape" && closeAllPopups(),
  );

  // Carrusel de comentarios
  const track = document.querySelector(".comentarios-carrusel-track");
  const slides = document.querySelectorAll(".comentario-carrusel-slide");
  const prevBtn = document.querySelector(".comentarios-prev-btn");
  const nextBtn = document.querySelector(".comentarios-next-btn");
  const dots = document.querySelectorAll(".comentarios-dot");

  if (track && slides.length) {
    let currentIndex = 0;
    let slidesPerView = window.innerWidth <= 768 ? 1 : 2;
    const maxIndex = Math.ceil(slides.length / slidesPerView) - 1;

    function updateCarousel() {
      const slideWidth = slides[0].offsetWidth + 30;
      track.style.transform = `translateX(-${currentIndex * slideWidth * slidesPerView}px)`;
      dots.forEach((dot, i) =>
        dot.classList.toggle("active", i === currentIndex),
      );
    }

    prevBtn?.addEventListener("click", () => {
      currentIndex = currentIndex > 0 ? currentIndex - 1 : maxIndex;
      updateCarousel();
    });

    nextBtn?.addEventListener("click", () => {
      currentIndex = currentIndex < maxIndex ? currentIndex + 1 : 0;
      updateCarousel();
    });

    dots.forEach((dot, i) =>
      dot.addEventListener("click", () => {
        currentIndex = i;
        updateCarousel();
      }),
    );

    window.addEventListener("resize", () => {
      slidesPerView = window.innerWidth <= 768 ? 1 : 2;
      updateCarousel();
    });

    updateCarousel();
  }

  // Leer más en comentarios
  document.querySelectorAll(".leer-mas-btn").forEach((boton) => {
    boton.addEventListener("click", function () {
      const cuerpo = this.closest(".comentario-carrusel-cuerpo");
      const textoCorto = cuerpo.querySelector(".texto-corto");
      const textoCompleto = cuerpo.querySelector(".texto-completo");

      if (textoCorto.style.display !== "none") {
        textoCorto.style.display = "none";
        textoCompleto.style.display = "inline";
        this.textContent = "Leer menos";
      } else {
        textoCorto.style.display = "inline";
        textoCompleto.style.display = "none";
        this.textContent = "Leer más";
      }
    });
  });

  // Control de videos
  document.querySelectorAll(".video-card").forEach((card) => {
    const playBtn = card.querySelector(".video-play-btn");
    const poster = card.querySelector(".video-poster");
    const video = card.querySelector(".video-player");

    if (playBtn && poster && video) {
      playBtn.addEventListener("click", function (e) {
        e.stopPropagation();
        poster.style.display = "none";
        playBtn.style.display = "none";
        video.classList.add("show-video");
        video.play();

        video.addEventListener("fullscreenchange", function () {
          video.style.objectFit = document.fullscreenElement
            ? "contain"
            : "cover";
        });
      });

      video.addEventListener("ended", function () {
        poster.style.display = "block";
        playBtn.style.display = "flex";
        video.classList.remove("show-video");
        video.style.objectFit = "cover";
      });
    }
  });

  // Acordeones
  document.querySelectorAll(".accordion-header").forEach((header) => {
    header.addEventListener("click", function () {
      document.querySelectorAll(".accordion-header").forEach((h) => {
        if (h !== header && h.classList.contains("active")) {
          h.classList.remove("active");
          h.nextElementSibling?.classList.remove("show");
        }
      });
      this.classList.toggle("active");
      this.nextElementSibling?.classList.toggle("show");
    });
  });

  // Texto expandible Sobre Mí
  const aboutContent = document.getElementById("aboutTextContent");
  const toggleBtn = document.getElementById("aboutToggleBtn");

  if (aboutContent && toggleBtn) {
    aboutContent.classList.add("collapsed");
    toggleBtn.addEventListener("click", function () {
      const isExpanded = aboutContent.classList.contains("expanded");
      aboutContent.classList.toggle("expanded");
      aboutContent.classList.toggle("collapsed");
      this.classList.toggle("expanded");
      this.querySelector("span").textContent = isExpanded
        ? "Ver más"
        : "Ver menos";
    });
  }
});
