// Smooth scroll al hacer clic en botones de anclaje
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const destino = document.querySelector(this.getAttribute('href'));
    if (destino) {
      destino.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Validación básica del formulario
document.getElementById('contactForm').addEventListener('submit', function (e) {
  e.preventDefault(); // Previene envío real

  const nombre = this.querySelector('input[type="text"]').value.trim();
  const email = this.querySelector('input[type="email"]').value.trim();
  const mensaje = this.querySelector('textarea').value.trim();

  if (!nombre || !email || !mensaje) {
    alert('Por favor, completá todos los campos.');
    return;
  }

  // Validación simple de email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert('Ingresá un email válido.');
    return;
  }

  // Simular éxito
  alert('¡Gracias por contactarte! Te responderemos pronto.');

  // Resetear formulario
  this.reset();
});
