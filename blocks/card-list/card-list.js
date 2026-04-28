import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    const cols = [...row.children];
    if (cols[0]) {
      cols[0].classList.add('card-list-image');
      li.append(cols[0]);
    }
    if (cols[1]) {
      cols[1].classList.add('card-list-body');
      li.append(cols[1]);
    }
    ul.append(li);
  });
  ul.querySelectorAll('picture > img').forEach((img) => {
    const optimized = createOptimizedPicture(img.src, img.alt, false, [{ width: '400' }]);
    img.closest('picture').replaceWith(optimized);
  });
  block.textContent = '';
  block.append(ul);
}
