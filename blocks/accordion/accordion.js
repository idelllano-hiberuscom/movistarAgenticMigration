export default function decorate(block) {
  [...block.children].forEach((row) => {
    row.classList.add('accordion-item');
    const cols = [...row.children];
    if (cols[0]) {
      cols[0].classList.add('accordion-question');
      cols[0].setAttribute('role', 'button');
      cols[0].setAttribute('tabindex', '0');
      cols[0].setAttribute('aria-expanded', 'false');
      cols[0].addEventListener('click', () => {
        const expanded = cols[0].getAttribute('aria-expanded') === 'true';
        cols[0].setAttribute('aria-expanded', expanded ? 'false' : 'true');
        row.classList.toggle('open');
      });
      cols[0].addEventListener('keydown', (e) => {
        if (e.code === 'Enter' || e.code === 'Space') {
          e.preventDefault();
          cols[0].click();
        }
      });
    }
    if (cols[1]) {
      cols[1].classList.add('accordion-answer');
    }
  });
}
