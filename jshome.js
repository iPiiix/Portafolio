 // === PANTALLA DE CARGA ===
    window.addEventListener('load', function() {
      setTimeout(() => {
        const loadingScreen = document.getElementById('loadingScreen');
        const mainContent = document.getElementById('mainContent');
        
        // Ocultar pantalla de carga
        loadingScreen.classList.add('hidden');
        
        // Mostrar contenido principal
        setTimeout(() => {
          mainContent.classList.add('show');
          document.body.style.overflow = 'auto'; // Permitir scroll
        }, 500);
        
      }, 4000); // 4 segundos de carga total
    });

    // Prevenir scroll durante la carga
    document.body.style.overflow = 'hidden';

    // === EFECTOS ORIGINALES ===
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -30px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
        }
      });
    }, observerOptions);

    // Observar secciones (después de que se muestre el contenido)
    setTimeout(() => {
      document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
      });
    }, 5000);

    // Efectos sutiles para proyectos
    setTimeout(() => {
      document.querySelectorAll('.proyecto').forEach(proyecto => {
        proyecto.addEventListener('mouseenter', () => {
          proyecto.style.transform = 'translateX(8px)';
        });
        
        proyecto.addEventListener('mouseleave', () => {
          proyecto.style.transform = 'translateX(0)';
        });
      });
    }, 5000);

    // Navegación activa
    window.addEventListener('scroll', () => {
      const sections = document.querySelectorAll('section');
      const navLinks = document.querySelectorAll('nav a');
      
      let current = '';
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollY >= sectionTop - 200) {
          current = section.getAttribute('id');
        }
      });

      navLinks.forEach(link => {
        link.style.color = '#ccc';
        if (link.getAttribute('href') === `#${current}`) {
          link.style.color = '#fff';
        }
      });
    });
