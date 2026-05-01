/**
 * loads and decorates the block
 * @param {Element} block The block element
 */
export default function decorate(block) {
  const rows = Array.from(block.children);

  const moveChildren = (from, to) => {
    if (!from) return;
    while (from.firstChild) {
      to.append(from.firstChild);
    }
  };

  const headerRow = rows.find((row) => !row.querySelector('picture')
    && row.querySelector('h1, h2, h3, h4, h5, h6'));
  const itemRows = rows.filter((row) => row !== headerRow);

  const wrapper = document.createElement('div');
  wrapper.className = 'logo-wall__wrapper';

  if (headerRow) {
    const header = document.createElement('div');
    header.className = 'logo-wall__header';
    moveChildren(headerRow, header);
    wrapper.append(header);
  }

  const grid = document.createElement('div');
  grid.className = 'logo-wall__grid';

  itemRows.forEach((row) => {
    const cell = row.querySelector(':scope > div');
    if (!cell) return;

    const picture = cell.querySelector('picture');
    const link = cell.querySelector('a');

    let item;
    if (link) {
      item = document.createElement('a');
      item.href = link.href;
      if (link.target) item.target = link.target;
      if (link.rel) item.rel = link.rel;
    } else {
      item = document.createElement('span');
    }

    item.className = 'logo-wall__item';

    if (picture) {
      const img = picture.querySelector('img');
      if (link && img && !link.textContent.trim()) {
        const label = img.getAttribute('alt');
        if (label) item.setAttribute('aria-label', label);
      }
      item.append(picture);
    }

    grid.append(item);
  });

  wrapper.append(grid);
  block.textContent = '';
  block.append(wrapper);
}
