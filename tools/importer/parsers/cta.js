/* global WebImporter */
export default function parse(element, { document }) {
  const heading = element.querySelector('h2, h3, .section-header__title');
  const cta = element.querySelector('a.mplus-button, a[href*="contratar"]');

  const cell = document.createElement('div');
  if (heading) {
    const h = document.createElement('h2');
    h.textContent = heading.textContent.trim();
    cell.append(h);
  }
  if (cta) {
    const a = document.createElement('a');
    a.href = cta.href;
    a.textContent = cta.textContent.trim();
    cell.append(a);
  }

  if (cell.children.length === 0) return;
  const table = WebImporter.DOMUtils.createTable([['CTA'], [cell]], document);
  element.replaceWith(table);
}
