/**
 * loads and decorates the block
 * @param {Element} block The block element
 */
export default function decorate(block) {
  const rows = Array.from(block.children);
  const primaryItems = [];
  const utilityItems = [];
  let logoItem = null;

  const pickType = (link) => {
    if (!link) return 'primary';
    const types = ['logo', 'icon', 'cta', 'utility', 'primary'];
    return types.find((type) => link.classList.contains(type)) || 'primary';
  };

  const buildItem = (link, picture) => {
    if (!link) {
      const span = document.createElement('span');
      span.className = 'site-header__icon';
      if (picture) span.append(picture);
      return span;
    }

    if (picture && !link.contains(picture)) {
      link.prepend(picture);
    }

    link.classList.add('site-header__link');
    if (!['logo', 'icon', 'cta', 'utility', 'primary'].some((type) => link.classList.contains(type))) {
      link.classList.add('primary');
    }

    if (!link.textContent.trim()) {
      const img = link.querySelector('img');
      const label = (img && img.getAttribute('alt')) || link.getAttribute('title');
      if (label) {
        link.setAttribute('aria-label', label);
      }
    }

    return link;
  };

  rows.forEach((row) => {
    const link = row.querySelector('a');
    const picture = row.querySelector('picture');
    if (!link && !picture) return;

    const item = buildItem(link, picture);
    const type = pickType(link);

    if (type === 'logo') {
      logoItem = item;
      return;
    }

    if (type === 'utility' || type === 'cta' || type === 'icon') {
      utilityItems.push(item);
      return;
    }

    primaryItems.push(item);
  });

  const header = document.createElement('div');
  header.className = 'site-header__inner';

  const logo = document.createElement('div');
  logo.className = 'site-header__logo';
  if (logoItem) logo.append(logoItem);

  const nav = document.createElement('nav');
  nav.className = 'site-header__nav';
  nav.setAttribute('aria-label', 'Primary');
  const navList = document.createElement('ul');
  primaryItems.forEach((item) => {
    const li = document.createElement('li');
    li.append(item);
    navList.append(li);
  });
  nav.append(navList);

  const utility = document.createElement('div');
  utility.className = 'site-header__utility';
  const utilityList = document.createElement('ul');
  utilityItems.forEach((item) => {
    const li = document.createElement('li');
    li.append(item);
    utilityList.append(li);
  });
  utility.append(utilityList);

  const toggle = document.createElement('button');
  toggle.type = 'button';
  toggle.className = 'site-header__toggle';
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-label', 'Toggle navigation');

  const navId = `site-header-nav-${Math.random().toString(36).slice(2, 8)}`;
  nav.id = navId;
  toggle.setAttribute('aria-controls', navId);

  for (let i = 0; i < 3; i += 1) {
    const bar = document.createElement('span');
    toggle.append(bar);
  }

  toggle.addEventListener('click', () => {
    const isOpen = block.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  block.textContent = '';
  header.append(logo, nav, utility, toggle);
  block.append(header);
}
