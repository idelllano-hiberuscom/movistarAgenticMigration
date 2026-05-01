export default function decorate(block) {
  const content = block.firstElementChild;
  if (content) {
    content.classList.add('cta-content');
  }

  const price = block.querySelector('strong');
  if (price) {
    price.classList.add('cta-price');
  }

  const button = block.querySelector('a');
  if (button) {
    button.classList.add('cta-button');
  }
}
