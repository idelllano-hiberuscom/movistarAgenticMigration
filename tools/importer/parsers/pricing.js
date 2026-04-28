/* global WebImporter */
export default function parse(element, { document }) {
  const wrapper = element.querySelector('.wrapper');
  const container = wrapper ? wrapper.querySelector(':scope > div') : element;
  const plans = container ? container.querySelectorAll(':scope > div') : [];
  const rows = [];

  plans.forEach((plan) => {
    const h3 = plan.querySelector('h3');
    const img = plan.querySelector('img');
    const lis = plan.querySelectorAll('li');
    const cta = plan.querySelector('a.mplus-button, a[href*="contratar"], a[href*="planes"]');

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
    if (h3) {
      const heading = document.createElement('h3');
      heading.textContent = h3.textContent.trim();
      textCell.append(heading);
    }
    if (lis.length > 0) {
      const ul = document.createElement('ul');
      lis.forEach((li) => {
        const newLi = document.createElement('li');
        newLi.textContent = li.textContent.trim();
        ul.append(newLi);
      });
      textCell.append(ul);
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
  });

  if (rows.length === 0) return;
  const table = WebImporter.DOMUtils.createTable([['Pricing'], ...rows], document);
  element.replaceWith(table);
}
