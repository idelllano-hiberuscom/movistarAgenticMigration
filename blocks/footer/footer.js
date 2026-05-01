import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

export default async function decorate(block) {
  const footerMeta = getMetadata('footer');
  const footerPath = footerMeta ? new URL(footerMeta, window.location).pathname : '/footer';
  const fragment = await loadFragment(footerPath);

  block.textContent = '';
  const footer = document.createElement('div');
  while (fragment.firstElementChild) footer.append(fragment.firstElementChild);

  const sections = footer.querySelectorAll(':scope > div');
  if (sections.length >= 1) {
    sections[0].classList.add('footer-links');
    const columns = sections[0].querySelectorAll(':scope > div');
    columns.forEach((col) => col.classList.add('footer-column'));
  }
  if (sections.length >= 2) sections[1].classList.add('footer-brand');
  if (sections.length >= 3) sections[2].classList.add('footer-legal');
  if (sections.length >= 4) sections[3].classList.add('footer-social');

  block.append(footer);
}
