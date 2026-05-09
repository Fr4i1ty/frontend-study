class SidebarContent extends HTMLElement {
  static get observedAttributes() {
    return ['current-page'];
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    const currentPage = this.getAttribute('current-page') || '';
    const currentPath = window.location.pathname;
    const inPagesFolder = currentPath.includes('/pages/');
    const prefix = inPagesFolder ? '' : 'pages/';

    const links = [
      { id: 'postgresql', href: prefix + 'postgresql.html', label: 'PostgreSQL' },
      { id: 'mysql', href: prefix + 'mysql.html', label: 'MySQL' },
      { id: 'mongodb', href: prefix + 'mongodb.html', label: 'MongoDB' },
      { id: 'redis', href: prefix + 'redis.html', label: 'Redis' },
      { id: 'supabase', href: prefix + 'supabase.html', label: 'Supabase' },
      { id: 'comparison', href: prefix + 'comparison.html', label: 'Сравнение' },
    ];

    const linksHTML = links.map(l => {
      const isActive = l.id === currentPage;
      return `<li><a href="${l.href}" class="${isActive ? 'active' : ''}">${l.label}</a></li>`;
    }).join('');

    this.innerHTML = `
      <div class="container sidebar-content">
        <h2>Базы данных</h2>
        <ul class="sidebar-nav">
          ${linksHTML}
        </ul>
      </div>
    `;
  }
}
customElements.define('sidebar-content', SidebarContent);