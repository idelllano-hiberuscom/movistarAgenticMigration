/* global WebImporter */
export default function parse(element, { document }) {
  const questions = element.querySelectorAll('.mplus-accordion__question');
  const answers = element.querySelectorAll('.mplus-accordion__text');
  const rows = [];

  questions.forEach((q, i) => {
    const qCell = document.createElement('div');
    const h = document.createElement('h3');
    h.textContent = q.textContent.trim();
    qCell.append(h);

    const aCell = document.createElement('div');
    const answer = answers[i];
    if (answer) {
      const ps = answer.querySelectorAll('p, li, div');
      if (ps.length > 0) {
        ps.forEach((p) => {
          const text = p.textContent.trim();
          if (text) {
            const para = document.createElement('p');
            para.textContent = text;
            aCell.append(para);
          }
        });
      } else {
        const text = answer.textContent.trim();
        if (text) {
          const para = document.createElement('p');
          para.textContent = text;
          aCell.append(para);
        }
      }
    }

    if (qCell.children.length > 0) {
      rows.push([qCell, aCell]);
    }
  });

  if (rows.length === 0) return;
  const table = WebImporter.DOMUtils.createTable([['Accordion'], ...rows], document);
  element.replaceWith(table);
}
