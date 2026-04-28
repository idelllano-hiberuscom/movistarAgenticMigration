/* global WebImporter */
export default function parse(element, { document }) {
  const boxes = element.querySelectorAll('.mplus-benefits__box');
  const rows = [];
  boxes.forEach((box) => {
    const img = box.querySelector('img');
    const heading = box.querySelector('h3, h4, strong');
    const desc = box.querySelector('p');

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
    if (heading) {
      const h = document.createElement('h3');
      h.textContent = heading.textContent.trim();
      textCell.append(h);
    }
    if (desc) {
      const p = document.createElement('p');
      p.textContent = desc.textContent.trim();
      textCell.append(p);
    }

    if (imgCell.children.length > 0 || textCell.children.length > 0) {
      rows.push([imgCell, textCell]);
    }
  });
  if (rows.length === 0) return;
  const table = WebImporter.DOMUtils.createTable([['Feature Grid'], ...rows], document);
  element.replaceWith(table);
}
