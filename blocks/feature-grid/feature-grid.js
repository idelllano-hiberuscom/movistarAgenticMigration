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
  wrapper.className = 'feature-grid__wrapper';

  if (headerRow) {
    const header = document.createElement('div');
    header.className = 'feature-grid__header';
    moveChildren(headerRow, header);
    wrapper.append(header);
  }

  const grid = document.createElement('div');
  grid.className = 'feature-grid__items';

  itemRows.forEach((row) => {
    const cells = Array.from(row.children);
    if (!cells.length) return;

    const card = document.createElement('article');
    card.className = 'feature-grid__card';

    const media = document.createElement('div');
    media.className = 'feature-grid__media';
    moveChildren(cells[0], media);

    const content = document.createElement('div');
    content.className = 'feature-grid__content';
    if (cells[1]) moveChildren(cells[1], content);
    if (cells[2]) moveChildren(cells[2], content);

    const action = document.createElement('div');
    action.className = 'feature-grid__action';
    if (cells[3]) moveChildren(cells[3], action);
    const link = action.querySelector('a');
    if (link) link.classList.add('feature-grid__link');

    card.append(media, content);
    if (action.childNodes.length) {
      card.append(action);
    }

    grid.append(card);
  });

  wrapper.append(grid);
  block.textContent = '';
  block.append(wrapper);
}
