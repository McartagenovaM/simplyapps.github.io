(() => {
  document.documentElement.classList.add('js');

  const navMount = document.querySelector('#site-nav');
  const footerMount = document.querySelector('#site-footer');
  const page = document.body.dataset.page;

  const ctaHref = 'index.html#contacto';

  if (navMount) {
    navMount.innerHTML = `
      <nav class="nav" aria-label="Navegación principal">
        <div class="container nav__inner">
          <a class="brand" href="index.html" aria-label="Ir al inicio de SimplyApps">
            <img src="images/logoh.svg" alt="SimplyApps" />
          </a>
          <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="nav-menu">
            <span class="sr-only">Abrir menú</span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </button>
          <div class="nav__menu" id="nav-menu">
            <a data-nav="inicio" href="index.html">Inicio</a>
            <a data-nav="servicios" href="services.html">Servicios</a>
            <a data-nav="proceso" href="process.html">Proceso</a>
            <a data-nav="tecnologias" href="technologies.html">Tecnologías</a>
            <a data-nav="privacy" href="privacy.html">Privacidad</a>
            <a data-nav="support" href="support.html">Soporte</a>
            <a class="btn btn--sm" href="${ctaHref}">Solicitar propuesta</a>
          </div>
        </div>
      </nav>
    `;
  }

  if (footerMount) {
    footerMount.innerHTML = `
      <footer class="site-footer">
        <div class="container footer-grid">
          <div>
            <a class="footer-brand" href="index.html">
              <img src="images/LogoSquare.svg" alt="Logo SimplyApps" />
            </a>
            <p>Diseñamos software a la medida para empresas que necesitan productos digitales sólidos, rápidos de lanzar y preparados para crecer.</p>
          </div>
          <div>
            <h3>Navegación</h3>
            <ul>
              <li><a href="index.html">Inicio</a></li>
              <li><a href="services.html">Servicios</a></li>
              <li><a href="process.html">Proceso</a></li>
              <li><a href="technologies.html">Tecnologías</a></li>
              <li><a href="privacy.html">Privacidad</a></li>
              <li><a href="support.html">Soporte</a></li>
            </ul>
          </div>
          <div>
            <h3>Soluciones</h3>
            <ul>
              <li>Apps iOS nativas</li>
              <li>Apps Android nativas</li>
              <li>Aplicaciones web empresariales</li>
              <li>Backends y APIs</li>
              <li>Integraciones con SQL Server</li>
            </ul>
          </div>
          <div>
            <h3>Contacto</h3>
            <ul>
              <li>Quito, Ecuador</li>
              <li><a href="tel:+593992572738">+593992572738</a></li>
              <li><a href="mailto:simply.apps.ec@gmail.com">simply.apps.ec@gmail.com</a></li>
              <li>Soporte comercial y técnico</li>
            </ul>
          </div>
        </div>
        <div class="container footer-copy">
          <small>© 2026 SimplyApps. Todos los derechos reservados.</small>
          <small>Diseñado y desarrollado por SimplyApps.</small>
        </div>
      </footer>
    `;
  }

  const nav = document.querySelector('.nav');
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.querySelector('.nav__menu');

  const setScrolled = () => nav?.classList.toggle('is-scrolled', window.scrollY > 16);
  window.addEventListener('scroll', setScrolled, { passive: true });
  setScrolled();

  if (menu && page) {
    menu.querySelector(`[data-nav="${page}"]`)?.classList.add('is-active');
  }

  if (!toggle || !menu) return;

  const closeMenu = () => {
    menu.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
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

  window.addEventListener('resize', () => {
    if (window.innerWidth > 780) closeMenu();
  });
})();
