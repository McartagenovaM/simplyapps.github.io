(() => {
  document.documentElement.classList.add('js');

  const nav = document.querySelector('.nav');
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.querySelector('.nav__menu');

  const setScrolled = () => nav?.classList.toggle('is-scrolled', window.scrollY > 10);
  window.addEventListener('scroll', setScrolled, { passive: true });
  setScrolled();

  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      const open = menu.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
    });

    menu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        menu.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  const slides = Array.from(document.querySelectorAll('[data-slide]'));
  const prev = document.querySelector('[data-prev]');
  const next = document.querySelector('[data-next]');
  const hero = document.querySelector('.hero');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (slides.length > 1) {
    let index = 0;
    let timer;
    let isVisible = true;

    const showSlide = (newIndex) => {
      slides[index].classList.remove('is-active');
      index = (newIndex + slides.length) % slides.length;
      slides[index].classList.add('is-active');
    };

    const startAuto = () => {
      clearInterval(timer);
      if (reduceMotion || !isVisible) return;
      timer = setInterval(() => showSlide(index + 1), 6200);
    };

    const stopAuto = () => clearInterval(timer);

    prev?.addEventListener('click', () => {
      showSlide(index - 1);
      startAuto();
    });

    next?.addEventListener('click', () => {
      showSlide(index + 1);
      startAuto();
    });

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        stopAuto();
      } else {
        startAuto();
      }
    });

    if (hero && 'IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          isVisible = entry.isIntersecting;
          if (isVisible) startAuto();
          else stopAuto();
        },
        { threshold: 0.35 }
      );
      observer.observe(hero);
    }

    startAuto();
  }
})();
