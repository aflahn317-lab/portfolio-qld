document.addEventListener('DOMContentLoaded', () => {
  // Theme Toggle
  const themeToggle = document.getElementById('theme-toggle');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  // Initialize Theme
  if (localStorage.getItem('theme') === 'light' || (!localStorage.getItem('theme') && prefersDark)) {
    document.documentElement.setAttribute('data-theme', 'light');
    if(themeToggle) themeToggle.innerHTML = '<i class="ph ph-sun"></i>';
  } else {
    document.documentElement.setAttribute('data-theme', 'dark');
    if(themeToggle) themeToggle.innerHTML = '<i class="ph ph-moon"></i>';
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      
      themeToggle.innerHTML = newTheme === 'dark' ? '<i class="ph ph-sun"></i>' : '<i class="ph ph-moon"></i>';
    });
  }

  // Scroll Animations (Intersection Observer)
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
        
        // Counter Animation for Stats
        if (entry.target.classList.contains('stat-card')) {
          const countElement = entry.target.querySelector('.stat-number');
          if (countElement) {
            const target = parseInt(countElement.getAttribute('data-target'));
            animateValue(countElement, 0, target, 2000);
          }
        }
      }
    });
  }, observerOptions);

  document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
  });

  // Animated Counter Function
  function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // easeOutQuart
      const easeProgress = 1 - Math.pow(1 - progress, 4);
      obj.innerHTML = Math.floor(easeProgress * (end - start) + start) + (obj.getAttribute('data-suffix') || '');
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        obj.innerHTML = end + (obj.getAttribute('data-suffix') || '');
      }
    };
    window.requestAnimationFrame(step);
  }

  // Mobile Menu Toggle
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');
  
  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active'); // In a real app, you'd add CSS for this active state
      if (navLinks.style.display === 'flex') {
        navLinks.style.display = 'none';
      } else {
        navLinks.style.display = 'flex';
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '100%';
        navLinks.style.left = '0';
        navLinks.style.width = '100%';
        navLinks.style.backgroundColor = 'var(--bg-glass)';
        navLinks.style.backdropFilter = 'blur(12px)';
        navLinks.style.padding = '2rem';
        navLinks.style.borderBottom = '1px solid var(--border)';
      }
    });
  }
});
