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

    // Observar secciones
    document.querySelectorAll('section').forEach(section => {
      observer.observe(section);
    });

    // Efectos sutiles para proyectos
    document.querySelectorAll('.proyecto').forEach(proyecto => {
      proyecto.addEventListener('mouseenter', () => {
        proyecto.style.transform = 'translateX(8px)';
      });
      
      proyecto.addEventListener('mouseleave', () => {
        proyecto.style.transform = 'translateX(0)';
      });
    });

    // Navegación activa
    window.addEventListener('scroll', () => {
      const sections = document.querySelectorAll('section');
      const navLinks = document.querySelectorAll('nav a');
      
      let current = '';
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
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