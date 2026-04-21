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

  if (slides.length > 1) {
    let index = 0;
    let timer;

    const showSlide = (newIndex) => {
      slides[index].classList.remove('is-active');
      index = (newIndex + slides.length) % slides.length;
      slides[index].classList.add('is-active');
    };

    const startAuto = () => {
      clearInterval(timer);
      timer = setInterval(() => showSlide(index + 1), 5800);
    };

    prev?.addEventListener('click', () => {
      showSlide(index - 1);
      startAuto();
    });

    next?.addEventListener('click', () => {
      showSlide(index + 1);
      startAuto();
    });

    startAuto();
  }
})();
