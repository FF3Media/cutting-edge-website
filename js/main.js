// Cutting Edge Lawn Care - Main JavaScript (Modern Interactions Edition)

document.addEventListener('DOMContentLoaded', function() {

  // ==========================================
  // Enhanced Sticky Header with Blur & Opacity
  // ==========================================
  const header = document.getElementById('main-header');
  let lastScrollY = 0;
  let headerHidden = false;

  if (header) {
    window.addEventListener('scroll', function() {
      const currentScrollY = window.scrollY;

      // Blur and opacity effect based on scroll
      const blur = Math.min(currentScrollY / 50, 12);
      const opacity = Math.min(0.85 + (currentScrollY / 500) * 0.15, 1);

      if (currentScrollY > 50) {
        header.style.backdropFilter = `blur(${blur}px)`;
        header.style.background = `rgba(255,255,255,${opacity})`;
        header.classList.add('shadow-sm');
      } else {
        header.style.backdropFilter = '';
        header.style.background = '';
        header.classList.remove('shadow-sm');
      }

      // Hide/show on scroll direction
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        if (!headerHidden) {
          header.style.transform = 'translateY(-100%)';
          header.style.transition = 'transform 0.3s ease-in-out';
          headerHidden = true;
        }
      } else {
        if (headerHidden) {
          header.style.transform = 'translateY(0)';
          header.style.transition = 'transform 0.3s ease-in-out';
          headerHidden = false;
        }
      }

      lastScrollY = currentScrollY;
    }, { passive: true });
  }

  // ==========================================
  // Smooth Scroll for Anchor Links
  // ==========================================
  document.querySelectorAll('a[href^="#"]').forEach(function(link) {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href !== '#') {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

  // ==========================================
  // Mobile Menu Toggle
  // ==========================================
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuIcon = document.getElementById('menu-icon');
  const closeIcon = document.getElementById('close-icon');

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', function() {
      mobileMenu.classList.toggle('open');
      if (menuIcon && closeIcon) {
        menuIcon.classList.toggle('hidden');
        closeIcon.classList.toggle('hidden');
      }
    });

    // Close menu when clicking a link
    mobileMenu.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function() {
        mobileMenu.classList.remove('open');
        if (menuIcon && closeIcon) {
          menuIcon.classList.remove('hidden');
          closeIcon.classList.add('hidden');
        }
      });
    });
  }

  // ==========================================
  // Services Dropdown (Desktop)
  // ==========================================
  const dropdownTrigger = document.getElementById('services-dropdown-trigger');
  const dropdownMenu = document.getElementById('services-dropdown-menu');

  if (dropdownTrigger && dropdownMenu) {
    let dropdownTimeout;

    dropdownTrigger.parentElement.addEventListener('mouseenter', function() {
      clearTimeout(dropdownTimeout);
      dropdownMenu.classList.remove('hidden');
      dropdownMenu.classList.add('animate-fade-in');
    });

    dropdownTrigger.parentElement.addEventListener('mouseleave', function() {
      dropdownTimeout = setTimeout(function() {
        dropdownMenu.classList.add('hidden');
      }, 150);
    });
  }

  // ==========================================
  // FAQ Accordion
  // ==========================================
  const faqButtons = document.querySelectorAll('.faq-toggle');
  faqButtons.forEach(function(btn) {
    btn.addEventListener('click', function() {
      const answer = this.nextElementSibling;
      const icon = this.querySelector('.faq-icon');

      // Close all other open FAQs
      faqButtons.forEach(function(otherBtn) {
        if (otherBtn !== btn) {
          const otherAnswer = otherBtn.nextElementSibling;
          const otherIcon = otherBtn.querySelector('.faq-icon');
          if (otherAnswer) otherAnswer.classList.remove('open');
          if (otherIcon) otherIcon.style.transform = 'rotate(0deg)';
        }
      });

      // Toggle current
      if (answer) answer.classList.toggle('open');
      if (icon) {
        icon.style.transform = answer && answer.classList.contains('open')
          ? 'rotate(45deg)'
          : 'rotate(0deg)';
      }
    });
  });

  // ==========================================
  // Testimonial Carousel with Pause & Swipe
  // ==========================================
  const carousel = document.getElementById('testimonial-carousel');
  const dotsContainer = document.querySelector('.carousel-dots');
  const dots = document.querySelectorAll('.carousel-dot');
  let currentSlide = 0;
  let totalSlides = 0;
  let autoAdvanceInterval;
  let touchStartX = 0;
  let touchEndX = 0;

  if (carousel) {
    totalSlides = carousel.children.length;

    function goToSlide(index) {
      currentSlide = index;
      carousel.style.transform = 'translateX(-' + (index * 100) + '%)';
      carousel.style.transition = 'transform 0.5s ease-in-out';

      dots.forEach(function(dot, i) {
        if (i === index) {
          dot.classList.remove('bg-green-800');
          dot.classList.add('bg-green-400');
        } else {
          dot.classList.remove('bg-green-400');
          dot.classList.add('bg-green-800');
        }
      });
    }

    function startAutoAdvance() {
      autoAdvanceInterval = setInterval(function() {
        goToSlide((currentSlide + 1) % totalSlides);
      }, 5000);
    }

    function stopAutoAdvance() {
      clearInterval(autoAdvanceInterval);
    }

    // Dot click handlers
    dots.forEach(function(dot, i) {
      dot.addEventListener('click', function() {
        goToSlide(i);
        stopAutoAdvance();
        startAutoAdvance();
      });
    });

    // Pause on hover
    if (dotsContainer) {
      dotsContainer.addEventListener('mouseenter', stopAutoAdvance);
      dotsContainer.addEventListener('mouseleave', startAutoAdvance);
    }
    carousel.addEventListener('mouseenter', stopAutoAdvance);
    carousel.addEventListener('mouseleave', startAutoAdvance);

    // Touch/swipe support
    carousel.addEventListener('touchstart', function(e) {
      touchStartX = e.changedTouches[0].screenX;
      stopAutoAdvance();
    }, false);

    carousel.addEventListener('touchend', function(e) {
      touchEndX = e.changedTouches[0].screenX;
      const diff = touchStartX - touchEndX;

      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          // Swiped left, go to next
          goToSlide((currentSlide + 1) % totalSlides);
        } else {
          // Swiped right, go to previous
          goToSlide((currentSlide - 1 + totalSlides) % totalSlides);
        }
      }
      startAutoAdvance();
    }, false);

    // Initialize
    startAutoAdvance();
  }

  // ==========================================
  // Quote Form Handling — submits to Netlify, shows in-page confirmation
  // =====================================================================
  const quoteForms = document.querySelectorAll('.quote-form');
  quoteForms.forEach(function(form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();

      // Validate required fields
      const required = form.querySelectorAll('[required]');
      let valid = true;
      required.forEach(function(field) {
        if (!field.value.trim()) {
          field.classList.add('border-red-500', 'ring-2', 'ring-red-500');
          valid = false;
        } else {
          field.classList.remove('border-red-500', 'ring-2', 'ring-red-500');
        }
      });
      if (!valid) return;

      const submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
      }

      fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(new FormData(form)).toString()
      }).then(function() {
        // Hide the form fields, show success message
        Array.from(form.children).forEach(function(child) {
          if (!child.id || child.id !== 'hero-success') child.style.display = 'none';
        });
        var successMsg = form.querySelector('.form-success');
        if (successMsg) {
          successMsg.style.display = 'block';
          successMsg.classList.remove('hidden');
          successMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }).catch(function() {
        if (submitBtn) {
          submitBtn.textContent = 'Get a Free Quote';
          submitBtn.disabled = false;
        }
      });
    });
  });

  // ==========================================
  // Scroll-triggered animations (Legacy)
  // ==========================================
  const animatedElements = document.querySelectorAll('[data-animate]');
  const animateChildrenContainers = document.querySelectorAll('[data-animate-children]');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          // Handle single element animation
          if (entry.target.hasAttribute('data-animate')) {
            entry.target.classList.add('animate-fade-in-up');
          }

          // Handle children animations with stagger
          if (entry.target.hasAttribute('data-animate-children')) {
            const children = entry.target.children;
            Array.from(children).forEach(function(child, index) {
              child.style.opacity = '0';
              child.classList.add('animate-fade-in-up');
              child.style.animationDelay = (index * 100) + 'ms';
            });
          }

          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    // Observe single animated elements
    animatedElements.forEach(function(el) {
      el.style.opacity = '0';
      observer.observe(el);
    });

    // Observe containers with children animations
    animateChildrenContainers.forEach(function(container) {
      observer.observe(container);
    });
  }

  // ==========================================
  // NEW: Scroll-driven Reveal System
  // ==========================================
  // Auto-stagger children if container has data-reveal-stagger
  document.querySelectorAll('[data-reveal-stagger]').forEach(container => {
    const children = container.querySelectorAll('[data-reveal]');
    const baseDelay = parseInt(container.dataset.revealStagger) || 100;
    children.forEach((child, i) => {
      child.dataset.revealDelay = i * baseDelay;
    });
  });

  // Main reveal observer
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const delay = parseInt(entry.target.dataset.revealDelay) || 0;
          setTimeout(() => {
            entry.target.classList.add('revealed');
          }, delay);
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('[data-reveal]').forEach(el => {
      // Set initial state based on reveal type
      const revealType = el.dataset.reveal;
      if (revealType === 'up') {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
      } else if (revealType === 'left') {
        el.style.opacity = '0';
        el.style.transform = 'translateX(-30px)';
      } else if (revealType === 'right') {
        el.style.opacity = '0';
        el.style.transform = 'translateX(30px)';
      } else if (revealType === 'scale') {
        el.style.opacity = '0';
        el.style.transform = 'scale(0.9)';
      } else if (revealType === 'clip') {
        el.style.opacity = '0';
        el.style.clipPath = 'inset(0 100% 0 0)';
      }

      revealObserver.observe(el);
    });
  }

  // ==========================================
  // NEW: Parallax on Scroll
  // ==========================================
  let parallaxTicking = false;

  function updateParallax() {
    const scrollY = window.scrollY;
    document.querySelectorAll('[data-parallax]').forEach(el => {
      const speed = parseFloat(el.dataset.parallax) || 0.1;
      const rect = el.getBoundingClientRect();
      const offset = (rect.top + scrollY - window.innerHeight / 2) * speed;
      el.style.transform = `translateY(${offset}px)`;
    });
    parallaxTicking = false;
  }

  if (document.querySelectorAll('[data-parallax]').length > 0) {
    window.addEventListener('scroll', () => {
      if (!parallaxTicking) {
        requestAnimationFrame(updateParallax);
        parallaxTicking = true;
      }
    }, { passive: true });
  }

  // ==========================================
  // NEW: Counter Animation for Stats
  // ==========================================
  function animateCounter(el) {
    const target = el.textContent;
    const match = target.match(/^([\d.]+)/);
    if (!match) return;

    const finalNum = parseFloat(match[1]);
    const suffix = target.replace(match[1], '');
    const duration = 2000;
    const startTime = performance.now();
    const isFloat = target.includes('.');

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * finalNum;

      el.textContent = (isFloat ? current.toFixed(1) : Math.floor(current)) + suffix;

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }
    requestAnimationFrame(update);
  }

  if ('IntersectionObserver' in window) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const numEl = entry.target.querySelector('.text-4xl, .text-5xl, .text-6xl, [data-count]');
          if (numEl) animateCounter(numEl);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    document.querySelectorAll('.stat-modern').forEach(el => counterObserver.observe(el));
  }

  // ==========================================
  // NEW: Magnetic Hover on CTA Buttons
  // ==========================================
  document.querySelectorAll('.btn-modern-primary').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px) scale(1.02)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });

  // ==========================================
  // Hero quote form — tabs + submission
  // ==========================================
  var tabRes = document.getElementById('tab-residential');
  var tabCom = document.getElementById('tab-commercial');
  if (tabRes && tabCom) {
    tabRes.addEventListener('click', function() {
      tabRes.classList.add('text-brand-700', 'bg-brand-50', 'border-b-2', 'border-brand-600');
      tabRes.classList.remove('text-gray-500');
      tabCom.classList.remove('text-brand-700', 'bg-brand-50', 'border-b-2', 'border-brand-600');
      tabCom.classList.add('text-gray-500');
    });
    tabCom.addEventListener('click', function() {
      tabCom.classList.add('text-brand-700', 'bg-brand-50', 'border-b-2', 'border-brand-600');
      tabCom.classList.remove('text-gray-500');
      tabRes.classList.remove('text-brand-700', 'bg-brand-50', 'border-b-2', 'border-brand-600');
      tabRes.classList.add('text-gray-500');
    });
  }

  var heroForm = document.getElementById('hero-quote-form');
  if (heroForm) {
    heroForm.addEventListener('submit', function(e) {
      e.preventDefault();
      var btn = heroForm.querySelector('button[type="submit"]');
      btn.textContent = 'Request Sent!';
      btn.classList.remove('bg-brand-700', 'hover:bg-brand-800');
      btn.classList.add('bg-green-600');
      btn.disabled = true;
      setTimeout(function() {
        btn.textContent = 'Book Now for 2026';
        btn.classList.add('bg-brand-700', 'hover:bg-brand-800');
        btn.classList.remove('bg-green-600');
        btn.disabled = false;
        heroForm.reset();
      }, 3000);
    });
  }

  // ==========================================
  // Phone number click tracking (GA ready)
  // ==========================================
  document.querySelectorAll('a[href^="tel:"]').forEach(function(link) {
    link.addEventListener('click', function() {
      // Google Analytics 4 event (uncomment when GA is set up)
      // gtag('event', 'phone_call', { event_category: 'contact', event_label: 'click_to_call' });
      console.log('Phone click tracked');
    });
  });

});
