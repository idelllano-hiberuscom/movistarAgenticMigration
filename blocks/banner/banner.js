export default function decorate(block) {
  const rows = [...block.children];
  if (rows.length === 0) return;

  const row = rows[0];
  const cols = [...row.children];

  if (cols[0]) {
    const pic = cols[0].querySelector('picture');
    if (pic) {
      cols[0].classList.add('banner-image');
    }
  }

  if (cols[1]) {
    cols[1].classList.add('banner-content');
    const button = cols[1].querySelector('a');
    if (button) button.classList.add('banner-button');
  }
}
