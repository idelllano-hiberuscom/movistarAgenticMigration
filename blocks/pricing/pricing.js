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

  const headerRow = rows.find((row) => !row.querySelector('picture') && !row.querySelector('a'));
  const planRows = rows.filter((row) => row !== headerRow);

  const wrapper = document.createElement('div');
  wrapper.className = 'pricing__wrapper';

  if (headerRow) {
    const header = document.createElement('div');
    header.className = 'pricing__header';
    moveChildren(headerRow, header);
    wrapper.append(header);
  }

  const grid = document.createElement('div');
  grid.className = 'pricing__plans';

  planRows.forEach((row) => {
    const cells = Array.from(row.children);
    if (!cells.length) return;

    const card = document.createElement('article');
    card.className = 'pricing__card';

    const media = document.createElement('div');
    media.className = 'pricing__media';
    moveChildren(cells[0], media);

    const content = document.createElement('div');
    content.className = 'pricing__content';
    moveChildren(cells[1], content);

    const price = document.createElement('div');
    price.className = 'pricing__price';
    moveChildren(cells[2], price);

    const cta = document.createElement('div');
    cta.className = 'pricing__cta';
    moveChildren(cells[3], cta);

    const button = cta.querySelector('a');
    if (button) button.classList.add('pricing__button');

    card.append(media, content, price, cta);
    grid.append(card);
  });

  wrapper.append(grid);

  block.textContent = '';
  block.append(wrapper);
}
