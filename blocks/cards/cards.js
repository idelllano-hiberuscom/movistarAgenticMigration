export default function decorate(block) {
  const rows = [...block.children];
  if (rows.length === 0) return;

  const isHighlight = block.classList.contains('highlight');
  const isVertical = block.classList.contains('vertical');

  const list = document.createElement('ul');
  list.className = 'cards-list';

  rows.forEach((row) => {
    const li = document.createElement('li');
    li.className = 'cards-item';

    const cols = [...row.children];
    if (cols[0]) {
      const pic = cols[0].querySelector('picture');
      if (pic) {
        const imageWrapper = document.createElement('div');
        imageWrapper.className = 'cards-item-image';
        imageWrapper.append(pic);
        li.append(imageWrapper);
      }
    }
    if (cols[1]) {
      cols[1].classList.add('cards-item-body');
      li.append(cols[1]);
    }

    list.append(li);
  });

  block.textContent = '';

  if (isHighlight && rows.length === 1) {
    list.firstElementChild?.classList.add('cards-item--featured');
  }

  if (isVertical) {
    list.classList.add('cards-list--vertical');
  }

  block.append(list);
}
