import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  const grid = document.createElement('div');
  grid.classList.add('gallery-grid');
  [...block.children].forEach((row) => {
    const item = document.createElement('div');
    item.classList.add('gallery-item');
    const cols = [...row.children];
    if (cols[0]) {
      cols[0].classList.add('gallery-image');
      item.append(cols[0]);
    }
    if (cols[1]) {
      cols[1].classList.add('gallery-caption');
      item.append(cols[1]);
    }
    grid.append(item);
  });
  grid.querySelectorAll('picture > img').forEach((img) => {
    const optimized = createOptimizedPicture(img.src, img.alt, false, [{ width: '400' }]);
    img.closest('picture').replaceWith(optimized);
  });
  block.textContent = '';
  block.append(grid);
}
