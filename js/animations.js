// Dark mode functionality
function initDarkMode() {
  // Get theme from localStorage or default to light
  const currentTheme = localStorage.getItem('theme') || 'light';

  // Apply theme
  if (currentTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
  } else {
    document.documentElement.removeAttribute('data-theme');
  }

  // Update icons
  updateDarkModeIcons(currentTheme);

  // Get toggle buttons
  const darkModeToggle = document.getElementById('darkModeToggle');
  const darkModeToggleMobile = document.getElementById('darkModeToggleMobile');

  // Toggle function
  function toggleDarkMode() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    if (newTheme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
    }

    updateDarkModeIcons(newTheme);
  }

  // Update icon function
  function updateDarkModeIcons(theme) {
    const iconMoon = document.getElementById('darkModeIcon');
    const iconSun = document.getElementById('darkModeIconSun');
    const iconMobileMoon = document.getElementById('darkModeIconMobile');
    const iconMobileSun = document.getElementById('darkModeIconMobileSun');

    if (theme === 'dark') {
      if (iconMoon) iconMoon.style.display = 'none';
      if (iconSun) iconSun.style.display = 'block';
      if (iconMobileMoon) iconMobileMoon.style.display = 'none';
      if (iconMobileSun) iconMobileSun.style.display = 'block';
    } else {
      if (iconMoon) iconMoon.style.display = 'block';
      if (iconSun) iconSun.style.display = 'none';
      if (iconMobileMoon) iconMobileMoon.style.display = 'block';
      if (iconMobileSun) iconMobileSun.style.display = 'none';
    }
  }

  // Add event listeners
  if (darkModeToggle) {
    darkModeToggle.addEventListener('click', toggleDarkMode);
  }

  if (darkModeToggleMobile) {
    darkModeToggleMobile.addEventListener('click', toggleDarkMode);
  }

  // Check for system preference on first load (if no preference is saved)
  if (!localStorage.getItem('theme')) {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (prefersDark) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
      updateDarkModeIcons('dark');
    }
  }
}

// Intersection Observer for scroll animations - handles both enter and exit with smooth transitions
const observerOptions = {
  threshold: 0.15,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    // Use requestAnimationFrame for smoother transitions
    requestAnimationFrame(() => {
      if (entry.isIntersecting) {
        // Item enters viewport - animate in smoothly
        entry.target.classList.remove('animate-out');
        entry.target.classList.add('animate-in');
      } else {
        // Item exits viewport - animate out smoothly
        entry.target.classList.remove('animate-in');
        entry.target.classList.add('animate-out');
      }
    });
  });
}, observerOptions);

// Parallax effect for images - optimized with requestAnimationFrame
function initParallax() {
  const parallaxElements = document.querySelectorAll('.home .img img, .about-me .image img');
  let ticking = false;

  function updateParallax() {
    const scrolled = window.pageYOffset;
    const rate = scrolled * 0.3;

    parallaxElements.forEach(element => {
      const rect = element.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        element.style.transform = `translate3d(0, ${rate * 0.1}px, 0)`;
      }
    });

    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }, { passive: true });
}

// Scroll progress indicator - optimized with requestAnimationFrame
function initScrollProgress() {
  const progressBar = document.createElement('div');
  progressBar.className = 'scroll-progress';
  document.body.appendChild(progressBar);

  let ticking = false;

  function updateProgress() {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    progressBar.style.width = scrolled + '%';
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(updateProgress);
      ticking = true;
    }
  }, { passive: true });
}

// Magnetic hover effect - optimized with requestAnimationFrame
function initMagneticEffect() {
  /*const magneticElements = document.querySelectorAll('.skill, .project, .contact, .portfolio .head a');

  magneticElements.forEach(element => {
    let rafId = null;
    let currentX = 0;
    let currentY = 0;
    let targetX = 0;
    let targetY = 0;

    function animate() {
      currentX += (targetX - currentX) * 0.1;
      currentY += (targetY - currentY) * 0.1;

      if (Math.abs(targetX - currentX) > 0.01 || Math.abs(targetY - currentY) > 0.01) {
        element.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
        rafId = requestAnimationFrame(animate);
      } else {
        element.style.transform = `translate3d(${targetX}px, ${targetY}px, 0)`;
      }
    }

    element.addEventListener('mousemove', (e) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      targetX = x * 0.1;
      targetY = y * 0.1;

      if (!rafId) {
        rafId = requestAnimationFrame(animate);
      }
    }, { passive: true });

    element.addEventListener('mouseleave', () => {
      targetX = 0;
      targetY = 0;
      if (!rafId) {
        rafId = requestAnimationFrame(animate);
      }
    });
  });*/
}

// 3D tilt effect for project cards - optimized with requestAnimationFrame
function init3DTilt() {
  /* const projectCards = document.querySelectorAll('.portfolio .project_container .project');
 
   projectCards.forEach(card => {
     let rafId = null;
     let currentRotateX = 0;
     let currentRotateY = 0;
     let currentTranslateY = 0;
     let targetRotateX = 0;
     let targetRotateY = 0;
     let targetTranslateY = 0;
 
     function animate() {
       currentRotateX += (targetRotateX - currentRotateX) * 0.15;
       currentRotateY += (targetRotateY - currentRotateY) * 0.15;
       currentTranslateY += (targetTranslateY - currentTranslateY) * 0.15;
 
       if (Math.abs(targetRotateX - currentRotateX) > 0.01 ||
         Math.abs(targetRotateY - currentRotateY) > 0.01 ||
         Math.abs(targetTranslateY - currentTranslateY) > 0.01) {
         card.style.transform = `perspective(1000px) rotateX(${currentRotateX}deg) rotateY(${currentRotateY}deg) translate3d(0, ${currentTranslateY}px, 0)`;
         rafId = requestAnimationFrame(animate);
       } else {
         card.style.transform = `perspective(1000px) rotateX(${targetRotateX}deg) rotateY(${targetRotateY}deg) translate3d(0, ${targetTranslateY}px, 0)`;
       }
     }
 
     card.addEventListener('mousemove', (e) => {
       const rect = card.getBoundingClientRect();
       const x = e.clientX - rect.left;
       const y = e.clientY - rect.top;
 
       const centerX = rect.width / 2;
       const centerY = rect.height / 2;
 
       targetRotateX = (y - centerY) / 10;
       targetRotateY = (centerX - x) / 10;
       targetTranslateY = -8;
 
       if (!rafId) {
         rafId = requestAnimationFrame(animate);
       }
     }, { passive: true });
 
     card.addEventListener('mouseleave', () => {
       targetRotateX = 0;
       targetRotateY = 0;
       targetTranslateY = 0;
       if (!rafId) {
         rafId = requestAnimationFrame(animate);
       }
     });
   });*/
}

// Typing effect for home section
function initTypingEffect() {
  const textElement = document.querySelector('.home .container .desc h1');
  if (!textElement) return;

  const originalText = textElement.innerHTML;
  const textToType = textElement.textContent;
  const spanElement = textElement.querySelector('span');

  if (spanElement) {
    const spanText = spanElement.textContent;
    textElement.innerHTML = textElement.innerHTML.replace(spanText, `<span class="typing-text">${spanText}</span>`);

    const typingSpan = textElement.querySelector('.typing-text');
    if (typingSpan) {
      typingSpan.textContent = '';
      let index = 0;

      function type() {
        if (index < spanText.length) {
          typingSpan.textContent += spanText.charAt(index);
          index++;
          setTimeout(type, 100);
        }
      }

      setTimeout(type, 1000);
    }
  }
}

// Loading screen
function initLoader() {
  const loader = document.createElement('div');
  loader.className = 'loader';
  document.body.appendChild(loader);

  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.style.display = 'none';
    }, 1500);
  });
}

// Scroll indicator - optimized with requestAnimationFrame
function initScrollIndicator() {
  const scrollIndicator = document.createElement('div');
  scrollIndicator.className = 'scroll-indicator';
  document.body.appendChild(scrollIndicator);

  let ticking = false;

  function updateIndicator() {
    if (window.scrollY > 100) {
      scrollIndicator.style.opacity = '0';
    } else {
      scrollIndicator.style.opacity = '1';
    }
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(updateIndicator);
      ticking = true;
    }
  }, { passive: true });

  scrollIndicator.addEventListener('click', () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  });
}

// Smooth reveal animation for text - optimized with transform3d
function initTextReveal() {
  const textElements = document.querySelectorAll('.home .container .desc p, .home .container .desc h1');

  textElements.forEach((element, index) => {
    element.style.opacity = '0';
    element.style.transform = 'translate3d(0, 20px, 0)';

    setTimeout(() => {
      element.style.transition = 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
      element.style.opacity = '1';
      element.style.transform = 'translate3d(0, 0, 0)';
    }, index * 200);
  });
}

// Counter animation for numbers (if any)
function animateCounter(element, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16);

  const timer = setInterval(() => {
    start += increment;
    if (start >= target) {
      element.textContent = target;
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(start);
    }
  }, 16);
}

// Observe all elements that should animate on scroll
document.addEventListener('DOMContentLoaded', () => {
  // Initialize dark mode (should be first to avoid flash)
  initDarkMode();

  // Initialize loader
  initLoader();

  // Initialize scroll progress
  initScrollProgress();

  // Initialize scroll indicator
  initScrollIndicator();

  // Initialize parallax
  initParallax();

  // Initialize magnetic effect
  initMagneticEffect();

  // Initialize 3D tilt
  init3DTilt();

  // Initialize typing effect
  setTimeout(initTypingEffect, 500);

  // Initialize text reveal
  initTextReveal();

  // Animate sections
  const sections = document.querySelectorAll('.about-me, .skills, .portfolio, .contact-us');
  sections.forEach(section => {
    section.classList.add('fade-in-up');
    observer.observe(section);
  });

  // Animate skill cards with stagger
  const skillCards = document.querySelectorAll('.skill');
  skillCards.forEach((card, index) => {
    card.classList.add('fade-in-up');
    card.style.animationDelay = `${index * 0.1}s`;
    observer.observe(card);
  });

  // Animate project cards with stagger
  const projectCards = document.querySelectorAll('.project');
  projectCards.forEach((card, index) => {
    card.classList.add('fade-in-up');
    card.style.animationDelay = `${index * 0.1}s`;
    observer.observe(card);
  });

  // Animate special titles
  const specialTitles = document.querySelectorAll('.special-title');
  specialTitles.forEach(title => {
    title.classList.add('fade-in-up');
    observer.observe(title);
  });

  // Animate contact info items
  const contactInfoItems = document.querySelectorAll('.contact-info');
  contactInfoItems.forEach((item, index) => {
    item.classList.add('fade-in-left');
    item.style.animationDelay = `${index * 0.15}s`;
    observer.observe(item);
  });

  // Animate form inputs
  const formInputs = document.querySelectorAll('.input');
  formInputs.forEach((input, index) => {
    input.classList.add('fade-in-up');
    input.style.animationDelay = `${index * 0.1}s`;
    observer.observe(input);
  });

  // Animate home section text
  const homeText = document.querySelector('.home .desc');
  if (homeText) {
    homeText.classList.add('fade-in-left');
    observer.observe(homeText);
  }

  // Animate home image
  const homeImage = document.querySelector('.home .img');
  if (homeImage) {
    homeImage.classList.add('fade-in-right');
    observer.observe(homeImage);
  }

  // Animate about image
  const aboutImage = document.querySelector('.about-me .image');
  if (aboutImage) {
    aboutImage.classList.add('fade-in-left');
    observer.observe(aboutImage);
  }

  // Header scroll effect with smooth transition - optimized with requestAnimationFrame
  let lastScroll = 0;
  let ticking = false;
  const header = document.querySelector('header');

  function updateHeader() {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
      header.classList.add('header-scrolled');
    } else {
      header.classList.remove('header-scrolled');
    }

    // Hide/show header on scroll
    if (currentScroll > lastScroll && currentScroll > 200) {
      header.style.transform = 'translate3d(0, -100%, 0)';
    } else {
      header.style.transform = 'translate3d(0, 0, 0)';
    }

    lastScroll = currentScroll;
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(updateHeader);
      ticking = true;
    }
  }, { passive: true });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Enhanced ripple effect to buttons with improved animation
  document.querySelectorAll('.contact, .portfolio .head a, .form-section .btn .contact, .home .container .desc a').forEach(button => {
    button.addEventListener('click', function (e) {
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height) * 2;
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      ripple.classList.add('ripple');

      this.appendChild(ripple);

      // Add active state for visual feedback
      this.classList.add('button-active');
      setTimeout(() => {
        this.classList.remove('button-active');
      }, 200);

      setTimeout(() => {
        ripple.remove();
      }, 800);
    });

    // Add hover shine effect
    button.addEventListener('mouseenter', function () {
      this.classList.add('button-hover');
    });

    button.addEventListener('mouseleave', function () {
      this.classList.remove('button-hover');
    });
  });
});

