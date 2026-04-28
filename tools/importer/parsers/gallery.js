/* global WebImporter */
export default function parse(element, { document }) {
  const items = element.querySelectorAll('li');
  const rows = [];
  items.forEach((item) => {
    const img = item.querySelector('img');
    const link = item.querySelector('a');
    if (!img) return;

    const imgCell = document.createElement('div');
    const pic = document.createElement('picture');
    const newImg = document.createElement('img');
    newImg.src = img.src;
    newImg.alt = img.alt || '';
    pic.append(newImg);
    imgCell.append(pic);

    const textCell = document.createElement('div');
    if (link) {
      const a = document.createElement('a');
      a.href = link.href;
      a.textContent = img.alt || 'Ver más';
      textCell.append(a);
    }

    rows.push([imgCell, textCell]);
  });
  if (rows.length === 0) return;
  const table = WebImporter.DOMUtils.createTable([['Gallery'], ...rows], document);
  element.replaceWith(table);
}
