// Función para observar los elementos y animarlos cuando estén en el área visible
function animateOnScroll(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-visible');
            observer.unobserve(entry.target);
        }
    });
}

// Crear un observador de intersección
const observer = new IntersectionObserver(animateOnScroll, { threshold: 0.2 });

// Obtener todos los elementos con la clase "animate-invisible" y observarlos
const elements = document.querySelectorAll('.animate-invisible');
elements.forEach(element => {
    observer.observe(element);
});
