import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  const grid = document.createElement('div');
  grid.classList.add('mosaic-grid');
  [...block.children].forEach((row, i) => {
    const item = document.createElement('div');
    item.classList.add('mosaic-item');
    if (i === 0) item.classList.add('mosaic-featured');
    const cols = [...row.children];
    if (cols[0]) {
      cols[0].classList.add('mosaic-image');
      item.append(cols[0]);
    }
    if (cols[1]) {
      cols[1].classList.add('mosaic-body');
      item.append(cols[1]);
    }
    grid.append(item);
  });
  grid.querySelectorAll('picture > img').forEach((img) => {
    const optimized = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    img.closest('picture').replaceWith(optimized);
  });
  block.textContent = '';
  block.append(grid);
}
