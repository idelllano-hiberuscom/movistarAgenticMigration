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

  const headerRow = rows.find((row) => !row.querySelector('details')
    && row.querySelector('h1, h2, h3, h4, h5, h6'));
  const itemRows = rows.filter((row) => row !== headerRow);

  const wrapper = document.createElement('div');
  wrapper.className = 'accordion__wrapper';

  if (headerRow) {
    const header = document.createElement('div');
    header.className = 'accordion__header';
    moveChildren(headerRow, header);
    wrapper.append(header);
  }

  const list = document.createElement('div');
  list.className = 'accordion__list';

  itemRows.forEach((row, index) => {
    const cells = Array.from(row.children);
    if (!cells.length) return;

    const details = document.createElement('details');
    details.className = 'accordion__item';
    if (index === 0 && block.classList.contains('open-first')) {
      details.open = true;
    }

    const summary = document.createElement('summary');
    summary.className = 'accordion__summary';
    moveChildren(cells[0], summary);

    const panel = document.createElement('div');
    panel.className = 'accordion__panel';
    if (cells[1]) moveChildren(cells[1], panel);

    details.append(summary, panel);

    if (block.classList.contains('single')) {
      details.addEventListener('toggle', () => {
        if (details.open) {
          list.querySelectorAll('details').forEach((item) => {
            if (item !== details) item.open = false;
          });
        }
      });
    }

    list.append(details);
  });

  wrapper.append(list);
  block.textContent = '';
  block.append(wrapper);
}
