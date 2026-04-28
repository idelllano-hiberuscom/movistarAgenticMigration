/* global WebImporter */
export default function parse(element, { document }) {
  const rows = [];
  const content = element.querySelector('.mplus-collection__content') || element;
  const img = content.querySelector('img');
  const title = content.querySelector('h2, h3, .mplus-collection__title');
  const subtitle = content.querySelector('.mplus-collection__subtitle');
  const desc = content.querySelector('.mplus-collection__text');
  const cta = content.querySelector('a.mplus-button, a[href*="contratar"], a[href*="funcionalidades"]');

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
  if (subtitle) {
    const p1 = document.createElement('p');
    p1.textContent = subtitle.textContent.trim();
    textCell.append(p1);
  }
  if (title) {
    const h = document.createElement('h3');
    h.textContent = title.textContent.trim();
    textCell.append(h);
  }
  if (desc) {
    const p2 = document.createElement('p');
    p2.textContent = desc.textContent.trim();
    textCell.append(p2);
  }
  if (cta) {
    const a = document.createElement('a');
    a.href = cta.href;
    a.textContent = cta.textContent.trim();
    textCell.append(a);
  }

  if (imgCell.children.length > 0 || textCell.children.length > 0) {
    rows.push([imgCell, textCell]);
  }

  if (rows.length === 0) return;
  const table = WebImporter.DOMUtils.createTable([['Card List'], ...rows], document);
  element.replaceWith(table);
}
