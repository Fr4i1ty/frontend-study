class SiteHeader extends HTMLElement {
  connectedCallback() {
    const currentPage = this.getAttribute('current-page') || '';
    const path = window.location.pathname;
    const inPagesFolder = path.includes('/pages/');
    const homeHref = inPagesFolder ? '../index.html' : 'index.html';
    const prefix = inPagesFolder ? '' : 'pages/';

    const mainLinks = [
      { href: homeHref, label: 'Главная', id: 'home' },
      { href: prefix + 'comparison.html', label: 'Сравнение', id: 'comparison' },
    ];

    const dbLinks = [
      { href: prefix + 'postgresql.html', label: 'PostgreSQL', id: 'postgresql' },
      { href: prefix + 'mysql.html', label: 'MySQL', id: 'mysql' },
      { href: prefix + 'mongodb.html', label: 'MongoDB', id: 'mongodb' },
      { href: prefix + 'redis.html', label: 'Redis', id: 'redis' },
      { href: prefix + 'supabase.html', label: 'Supabase', id: 'supabase' },
    ];

    const infoLinks = [
      { href: prefix + 'about.html', label: 'О проекте', id: 'about' },
      { href: prefix + 'contact.html', label: 'Контакты', id: 'contact' },
      { href: prefix + 'videos.html', label: 'Видео', id: 'videos' },
    ];

    const makeLink = (p, isDropdownItem = false) => {
      const isCurrent = p.id === currentPage;
      const classes = isDropdownItem ? 'dropdown-item' : '';
      return `<li role="none"><a href="${p.href}" role="menuitem" class="${classes}" ${isCurrent ? 'aria-current="page"' : ''}>${p.label}</a></li>`;
    };

    const makeDropdown = (summaryText, links) => {
      const isCurrent = links.some(l => l.id === currentPage);
      return `
        <li role="none" class="dropdown-wrapper">
          <details class="dropdown">
            <summary role="menuitem" aria-haspopup="true" ${isCurrent ? 'aria-current="page"' : ''}>
              ${summaryText}
            </summary>
            <ul class="dropdown-menu" role="menu">
              ${links.map(l => makeLink(l, true)).join('')}
            </ul>
          </details>
        </li>
      `;
    };

    const menuHTML = mainLinks.map(l => makeLink(l)).join('') +
      makeDropdown('Базы данных', dbLinks) +
      makeDropdown('Инфо', infoLinks);

    this.innerHTML = `
      <header role="banner">
        <nav class="nav" role="navigation" aria-label="Главная навигация">
          <div class="container">
            <div class="nav-row">
              <a href="${homeHref}" class="logo" aria-label="На главную страницу"> DB for WebDev</a>
              <button class="burger" aria-expanded="false" aria-controls="main-menu" aria-label="Открыть меню">
                <span></span><span></span><span></span>
              </button>
            </div>
            <ul id="main-menu" class="nav-menu" role="menubar" aria-label="Основное меню">
              ${menuHTML}
              <li role="none" class="theme-toggle-wrapper">
                <button id="theme-toggle" class="theme-toggle" role="menuitem" aria-label="Переключить тему">
                  <span class="theme-icon">🌓</span>
                </button>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    `;

    this.initBurger();
    this.initTheme();
    this.initDropdowns();
  }

  initBurger() {
    const burger = this.querySelector('.burger');
    const menu = this.querySelector('.nav-menu');
    if (!burger || !menu) return;

    burger.addEventListener('click', () => {
      const expanded = menu.classList.toggle('active');
      burger.setAttribute('aria-expanded', String(expanded));
    });

    menu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        menu.classList.remove('active');
        burger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  initTheme() {
    const html = document.documentElement;
    const toggleBtn = this.querySelector('#theme-toggle');

    const applyTheme = (theme) => {
      html.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
    };

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      applyTheme(savedTheme);
    } else {
      applyTheme(mediaQuery.matches ? 'dark' : 'light');
    }

    mediaQuery.addEventListener('change', () => {
      if (!localStorage.getItem('theme')) {
        applyTheme(mediaQuery.matches ? 'dark' : 'light');
      }
    });

    toggleBtn.addEventListener('click', () => {
      const current = html.getAttribute('data-theme');
      applyTheme(current === 'dark' ? 'light' : 'dark');
    });
  }

  initDropdowns() {
    const dropdowns = this.querySelectorAll('.nav details.dropdown');
    const supportsHover = window.matchMedia('(hover: hover)').matches;
    if (!supportsHover) return;

    dropdowns.forEach(details => {
      details.addEventListener('mouseenter', () => {
        details.setAttribute('open', '');
      });
      details.addEventListener('mouseleave', () => {
        details.removeAttribute('open');
      });
    });
  }
}

customElements.define('site-header', SiteHeader);