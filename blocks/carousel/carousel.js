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
  wrapper.className = 'carousel__wrapper';

  if (headerRow) {
    const header = document.createElement('div');
    header.className = 'carousel__header';
    moveChildren(headerRow, header);
    wrapper.append(header);
  }

  const track = document.createElement('div');
  track.className = 'carousel__track';
  track.setAttribute('role', 'list');

  itemRows.forEach((row) => {
    const cells = Array.from(row.children);
    if (!cells.length) return;

    const card = document.createElement('article');
    card.className = 'carousel__card';
    card.setAttribute('role', 'listitem');

    const media = document.createElement('div');
    media.className = 'carousel__media';
    moveChildren(cells[0], media);

    const body = document.createElement('div');
    body.className = 'carousel__body';
    if (cells[1]) moveChildren(cells[1], body);
    if (cells[2]) moveChildren(cells[2], body);

    const cta = document.createElement('div');
    cta.className = 'carousel__cta';
    if (cells[3]) moveChildren(cells[3], cta);
    const link = cta.querySelector('a');
    if (link) link.classList.add('carousel__link');

    card.append(media, body);
    if (cta.childNodes.length) {
      card.append(cta);
    }

    track.append(card);
  });

  wrapper.append(track);
  block.textContent = '';
  block.append(wrapper);
}
