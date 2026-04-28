export default function decorate(block) {
  const row = block.children[0];
  if (!row) return;
  const cols = [...row.children];
  if (cols[0]) cols[0].classList.add('banner-image');
  if (cols[1]) cols[1].classList.add('banner-content');
}
