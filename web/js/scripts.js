let slideIndex = 0;

// Función para mostrar las diapositivas
function showSlides(n) {
    let slides = document.getElementsByClassName("carousel-item");

    // Verificar si n es mayor o igual a la cantidad de diapositivas
    if (n >= slides.length) {
        slideIndex = 0;
    }

    // Verificar si n es menor que 0
    if (n < 0) {
        slideIndex = slides.length - 1;
    }

    // Ocultar todas las diapositivas
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    // Mostrar la diapositiva actual
    slides[slideIndex].style.display = "block";
}

// Función para avanzar o retroceder las diapositivas
function plusSlides(n) {
    slideIndex += n;
    showSlides(slideIndex);
}

// Mostrar la primera diapositiva al cargar la página
showSlides(slideIndex);

// Cambiar de diapositiva automáticamente cada 5 segundos
setInterval(function () {
    plusSlides(1);
}, 5000);

document.addEventListener('DOMContentLoaded', function () {
    const menuIcon = document.querySelector('.menu-icon'); // Selecciona el icono del menú móvil
    const mobileMenu = document.querySelector('.mobile-menu'); // Selecciona el menú móvil
    const mobileDropdowns = document.querySelectorAll('.mobile-dropdown'); // Selecciona todos los submenús de primer nivel
    const mobileSubDropdowns = document.querySelectorAll('.mobile-sub-dropdown'); // Selecciona todos los sub-submenús

    // Función para resetear todos los submenús y sub-submenús
    function resetMenuState() {
        mobileDropdowns.forEach(dropdown => {
            dropdown.classList.remove('active');
            const dropdownContent = dropdown.querySelector('.mobile-dropdown-content');
            if (dropdownContent) {
                dropdownContent.classList.remove('active');
            }

            // Cerrar todos los sub-submenús dentro de este submenú
            const subDropdowns = dropdown.querySelectorAll('.mobile-sub-dropdown');
            subDropdowns.forEach(subDropdown => {
                subDropdown.classList.remove('active');
                const subDropdownContent = subDropdown.querySelector('.mobile-sub-dropdown-content');
                if (subDropdownContent) {
                    subDropdownContent.classList.remove('active');
                }
            });
        });
    }

    // Abrir o cerrar el menú móvil al hacer clic en el icono de menú
    menuIcon.addEventListener('click', function () {
        mobileMenu.classList.toggle('show'); // Alterna la visibilidad del menú móvil

        // Si se cierra la barra de navegación, resetear todos los menús
        if (!mobileMenu.classList.contains('show')) {
            resetMenuState();
        }
    });

    // Cerrar el menú móvil, submenús y sub-submenús al hacer clic fuera de él
    document.addEventListener('click', function (event) {
        const isClickInsideMenu = mobileMenu.contains(event.target);
        const isClickOnMenuIcon = menuIcon.contains(event.target);

        if (!isClickInsideMenu && !isClickOnMenuIcon && mobileMenu.classList.contains('show')) {
            mobileMenu.classList.remove('show');
            resetMenuState(); // Resetear todos los menús cuando se cierre la barra de navegación
        }
    });

    // Función para manejar el clic en los enlaces del menú (aplicable a la barra de navegación principal y al menú móvil)
    function handleMenuClick(event) {
        const targetId = this.getAttribute('href'); // Obtener el valor del href
        if (targetId.startsWith('#')) { // Solo aplicar desplazamiento suave para enlaces internos (anclas)
            event.preventDefault(); // Prevenir el comportamiento predeterminado de los enlaces

            const targetElement = document.getElementById(targetId.substring(1)); // Seleccionar el elemento de destino

            if (targetElement) { // Asegurarse de que el destino existe
                const headerHeight = document.querySelector('header').offsetHeight; // Obtener la altura del header
                const offsetPosition = targetElement.offsetTop - headerHeight; // Calcular la posición de desplazamiento

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth' // Desplazamiento suave hacia la posición de destino
                });
            }

            if (mobileMenu.classList.contains('show')) {
                mobileMenu.classList.remove('show');
                resetMenuState(); // Resetear todos los menús cuando se cierre la barra de navegación
            }
        }
    }

    // Agregar la funcionalidad a los enlaces de la barra de navegación principal
    const navLinks = document.querySelectorAll('nav ul li a'); // Selecciona todos los enlaces de la barra de navegación principal
    navLinks.forEach(link => {
        link.addEventListener('click', handleMenuClick); // Agrega el evento de clic a cada enlace en la barra de navegación principal
    });

    // Agregar la funcionalidad a los enlaces del menú móvil
    const mobileMenuLinks = document.querySelectorAll('.mobile-menu ul li a'); // Selecciona todos los enlaces del menú móvil
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', handleMenuClick); // Agrega el evento de clic a cada enlace en el menú móvil
    });

    const mobileDropdownArrows = document.querySelectorAll('.mobile-dropdown > .arrow'); // Selecciona las flechas de los submenús
    const mobileSubDropdownArrows = document.querySelectorAll('.mobile-sub-dropdown > .arrow'); // Selecciona las flechas de los sub-submenús

    // Manejar el clic en las flechas de primer nivel (Servicios)
    mobileDropdownArrows.forEach(arrow => {
        arrow.addEventListener('click', function (e) {
            e.stopPropagation(); // Prevenir la propagación del evento
            const parent = this.parentElement;
            const currentlyActiveDropdown = document.querySelector('.mobile-dropdown.active');

            // Cerrar el submenú actualmente activo si es diferente al seleccionado
            if (currentlyActiveDropdown && currentlyActiveDropdown !== parent) {
                currentlyActiveDropdown.classList.remove('active');
                const currentlyActiveDropdownContent = currentlyActiveDropdown.querySelector('.mobile-dropdown-content');
                if (currentlyActiveDropdownContent) {
                    currentlyActiveDropdownContent.classList.remove('active');
                }

                // Cerrar todos los sub-submenús dentro del submenú que se va a cerrar
                const subDropdowns = currentlyActiveDropdown.querySelectorAll('.mobile-sub-dropdown');
                subDropdowns.forEach(subDropdown => {
                    subDropdown.classList.remove('active');
                    const subDropdownContent = subDropdown.querySelector('.mobile-sub-dropdown-content');
                    if (subDropdownContent) {
                        subDropdownContent.classList.remove('active');
                    }
                });
            }

            // Alternar la clase 'active' en el submenú seleccionado
            parent.classList.toggle('active');
            parent.querySelector('.mobile-dropdown-content').classList.toggle('active');

            // Si el submenú se cierra, también cerrar todos sus sub-submenús
            if (!parent.classList.contains('active')) {
                const subDropdowns = parent.querySelectorAll('.mobile-sub-dropdown');
                subDropdowns.forEach(subDropdown => {
                    subDropdown.classList.remove('active');
                    const subDropdownContent = subDropdown.querySelector('.mobile-sub-dropdown-content');
                    if (subDropdownContent) {
                        subDropdownContent.classList.remove('active');
                    }
                });
            }
        });
    });

    // Manejar el clic en las flechas de segundo nivel (Área de TI)
    mobileSubDropdownArrows.forEach(arrow => {
        arrow.addEventListener('click', function (e) {
            e.stopPropagation(); // Prevenir la propagación del evento
            const parent = this.parentElement;
            const currentlyActiveSubDropdown = parent.parentElement.querySelector('.mobile-sub-dropdown.active');

            // Cerrar el sub-submenú actualmente activo si es diferente al seleccionado
            if (currentlyActiveSubDropdown && currentlyActiveSubDropdown !== parent) {
                currentlyActiveSubDropdown.classList.remove('active');
                const currentlyActiveSubDropdownContent = currentlyActiveSubDropdown.querySelector('.mobile-sub-dropdown-content');
                if (currentlyActiveSubDropdownContent) {
                    currentlyActiveSubDropdownContent.classList.remove('active');
                }
            }

            // Alternar la clase 'active' en el sub-submenú seleccionado
            parent.classList.toggle('active');
            parent.querySelector('.mobile-sub-dropdown-content').classList.toggle('active');
        });
    });

    // Prevenir el cierre del submenú de primer nivel al hacer clic en un sub-submenú
    document.querySelectorAll('.mobile-dropdown, .mobile-sub-dropdown').forEach(dropdown => {
        dropdown.addEventListener('click', function (e) {
            e.stopPropagation(); // Prevenir la propagación del evento para evitar el cierre inesperado del menú
        });
    });

});

// Resetea todos los formularios en la página al recargar
window.onbeforeunload = () => {
    for (const form of document.getElementsByTagName('form')) {
        form.reset(); // Resetea cada formulario al recargar la página
    }
};

// Función para animar el contador
function animateCounter(counter) {
  const target = +counter.getAttribute('data-target');
  const speed = 200; // Ajusta la velocidad de la animación

  const updateCount = () => {
    const current = +counter.innerText;
    const increment = target / speed;

    if (current < target) {
      counter.innerText = Math.ceil(current + increment);
      setTimeout(updateCount, 20);
    } else {
      counter.innerText = target; // Asegurarse de que el valor final sea exacto
    }
  };

  // Añadir retraso antes de iniciar la animación (en milisegundos)
  setTimeout(() => {
    updateCount();
  }, 450); // 2000 ms = 2 segundos de retraso
}

// Uso de Intersection Observer para detectar cuando el contador es visible
const counters = document.querySelectorAll('.counter');
const observerOptions = {
  root: null,
  threshold: 0.5 // El 50% del elemento debe estar visible para activarse
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      observer.unobserve(entry.target); // Dejar de observar una vez activada
    }
  });
}, observerOptions);

counters.forEach(counter => {
  observer.observe(counter);
});
