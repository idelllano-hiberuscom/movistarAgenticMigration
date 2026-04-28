import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  const grid = document.createElement('div');
  grid.classList.add('logo-wall-grid');
  [...block.children].forEach((row) => {
    const item = document.createElement('div');
    item.classList.add('logo-wall-item');
    const cols = [...row.children];
    if (cols[0]) item.append(...cols[0].childNodes);
    grid.append(item);
  });
  grid.querySelectorAll('picture > img').forEach((img) => {
    const optimized = createOptimizedPicture(img.src, img.alt, false, [{ width: '200' }]);
    img.closest('picture').replaceWith(optimized);
  });
  block.textContent = '';
  block.append(grid);
}
