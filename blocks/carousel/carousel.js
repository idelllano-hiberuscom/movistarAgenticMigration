import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  const track = document.createElement('div');
  track.classList.add('carousel-track');
  [...block.children].forEach((row) => {
    const card = document.createElement('div');
    card.classList.add('carousel-card');
    const cols = [...row.children];
    if (cols[0]) {
      cols[0].classList.add('carousel-card-image');
      card.append(cols[0]);
    }
    if (cols[1]) {
      cols[1].classList.add('carousel-card-body');
      card.append(cols[1]);
    }
    track.append(card);
  });
  track.querySelectorAll('picture > img').forEach((img) => {
    const optimized = createOptimizedPicture(img.src, img.alt, false, [{ width: '400' }]);
    img.closest('picture').replaceWith(optimized);
  });
  block.textContent = '';
  block.append(track);
}
