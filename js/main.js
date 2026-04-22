(() => {
  document.documentElement.classList.add('js');

  const page = document.body.dataset.page;
  const nav = document.querySelector('.nav');
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.querySelector('.nav__menu');
  const productsToggle = document.querySelector('.nav__dropdown-toggle');
  const productsItem = document.querySelector('.nav__item--dropdown');

  const setScrolled = () => nav?.classList.toggle('is-scrolled', window.scrollY > 16);
  window.addEventListener('scroll', setScrolled, { passive: true });
  setScrolled();

  if (menu && page) {
    menu.querySelector(`[data-nav="${page}"]`)?.classList.add('is-active');
  }

  const closeProductsMenu = () => {
    productsItem?.classList.remove('is-open');
    productsToggle?.setAttribute('aria-expanded', 'false');
  };

  if (productsToggle && productsItem) {
    productsToggle.addEventListener('click', () => {
      const open = productsItem.classList.toggle('is-open');
      productsToggle.setAttribute('aria-expanded', String(open));
    });
  }

  if (!toggle || !menu) return;

  const closeMenu = () => {
    menu.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    closeProductsMenu();
  };

  toggle.addEventListener('click', () => {
    const open = menu.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(open));
  });

  menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('click', (event) => {
    if (!menu.classList.contains('is-open')) return;
    if (menu.contains(event.target) || toggle.contains(event.target)) return;
    closeMenu();
  });

  document.addEventListener('click', (event) => {
    if (!productsItem?.classList.contains('is-open')) return;
    if (productsItem.contains(event.target)) return;
    closeProductsMenu();
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 780) closeMenu();
  });
})();
