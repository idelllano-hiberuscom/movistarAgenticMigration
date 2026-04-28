export default function decorate(block) {
  const cards = [...block.children];
  block.classList.add(`pricing-${cards.length}-cols`);
  cards.forEach((card) => {
    card.classList.add('pricing-card');
    const cols = [...card.children];
    if (cols[0]) cols[0].classList.add('pricing-card-image');
    if (cols[1]) cols[1].classList.add('pricing-card-body');
  });
}
