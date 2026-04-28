export default function decorate(block) {
  const content = block.children[0];
  if (content) content.classList.add('cta-content');
}
