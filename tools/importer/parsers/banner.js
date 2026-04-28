/* global WebImporter */
export default function parse(element, { document }) {
  const img = element.querySelector('.mplus-cintillo__image img, img');
  const textEl = element.querySelector('.mplus-cintillo__text, p, h2, h3');
  const link = element.querySelector('a');

  const imgCell = document.createElement('div');
  if (img) {
    const pic = document.createElement('picture');
    const newImg = document.createElement('img');
    newImg.src = img.src;
    newImg.alt = img.alt || '';
    pic.append(newImg);
    imgCell.append(pic);
  }

  const textCell = document.createElement('div');
  if (textEl) {
    const p = document.createElement('p');
    p.textContent = textEl.textContent.trim();
    textCell.append(p);
  }
  if (link) {
    const a = document.createElement('a');
    a.href = link.href;
    a.textContent = link.textContent.trim() || 'Ver más';
    textCell.append(a);
  }

  if (imgCell.children.length === 0 && textCell.children.length === 0) return;
  const table = WebImporter.DOMUtils.createTable([['Banner'], [imgCell, textCell]], document);
  element.replaceWith(table);
}
