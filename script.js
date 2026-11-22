(() => {
  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.primary-nav');

  if (menuButton && nav) {
    menuButton.addEventListener('click', () => {
      const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
      menuButton.setAttribute('aria-expanded', String(!isOpen));
      menuButton.setAttribute('aria-label', isOpen ? 'Open navigation' : 'Close navigation');
      nav.classList.toggle('is-open', !isOpen);
    });

    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        nav.classList.remove('is-open');
        menuButton.setAttribute('aria-expanded', 'false');
        menuButton.setAttribute('aria-label', 'Open navigation');
      });
    });
  }

  const filters = Array.from(document.querySelectorAll('.filter-button'));
  const publications = Array.from(document.querySelectorAll('.publication-item'));
  const count = document.getElementById('publication-count');

  filters.forEach((button) => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;
      filters.forEach((item) => {
        const active = item === button;
        item.classList.toggle('is-active', active);
        item.setAttribute('aria-pressed', String(active));
      });
      let visible = 0;
      publications.forEach((publication) => {
        const show = filter === 'all' || publication.dataset.kind === filter;
        publication.hidden = !show;
        if (show) visible += 1;
      });
      if (count) count.textContent = `Showing ${visible} ${visible === 1 ? 'record' : 'records'}`;
    });
  });

  const year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
})();
