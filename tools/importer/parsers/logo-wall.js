/* global WebImporter */
export default function parse(element, { document }) {
  const items = element.querySelectorAll('li');
  const rows = [];
  items.forEach((item) => {
    const img = item.querySelector('img');
    if (!img) return;
    const cell = document.createElement('div');
    const pic = document.createElement('picture');
    const newImg = document.createElement('img');
    newImg.src = img.src;
    newImg.alt = img.alt || '';
    pic.append(newImg);
    cell.append(pic);
    rows.push([cell]);
  });
  if (rows.length === 0) return;
  const table = WebImporter.DOMUtils.createTable([['Logo Wall'], ...rows], document);
  element.replaceWith(table);
}
