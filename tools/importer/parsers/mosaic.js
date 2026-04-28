/* global WebImporter */
export default function parse(element, { document }) {
  const items = element.querySelectorAll('li');
  const rows = [];
  items.forEach((item) => {
    const img = item.querySelector('img');
    const titleEl = item.querySelector('.title, h3, h4');
    const pretitle = item.querySelector('.pretitle');
    const link = item.querySelector('a');

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
    if (pretitle) {
      const p = document.createElement('p');
      p.textContent = pretitle.textContent.trim();
      textCell.append(p);
    }
    if (titleEl) {
      const h = document.createElement('h3');
      h.textContent = titleEl.textContent.trim();
      textCell.append(h);
    }
    if (link) {
      const a = document.createElement('a');
      a.href = link.href;
      a.textContent = link.textContent.trim() || titleEl?.textContent?.trim() || 'Ver más';
      if (textCell.children.length === 0) textCell.append(a);
    }

    if (imgCell.children.length > 0 || textCell.children.length > 0) {
      rows.push([imgCell, textCell]);
    }
  });
  if (rows.length === 0) return;
  const table = WebImporter.DOMUtils.createTable([['Mosaic'], ...rows], document);
  element.replaceWith(table);
}
