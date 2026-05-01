export default function decorate(block) {
  const rows = [...block.children];
  if (rows.length === 0) return;

  const grid = document.createElement('div');
  grid.className = 'mosaic-grid';

  rows.forEach((row, i) => {
    const item = document.createElement('div');
    item.className = 'mosaic-item';
    if (i === 0) item.classList.add('mosaic-item--large');

    const cols = [...row.children];
    if (cols[0]) {
      const pic = cols[0].querySelector('picture');
      if (pic) {
        const imageWrapper = document.createElement('div');
        imageWrapper.className = 'mosaic-item-image';
        imageWrapper.append(pic);
        item.append(imageWrapper);
      }
    }
    if (cols[1]) {
      cols[1].classList.add('mosaic-item-body');
      item.append(cols[1]);
    }

    grid.append(item);
  });

  block.textContent = '';
  block.append(grid);
}
