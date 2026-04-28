export default function decorate(block) {
  const items = [...block.children];
  const grid = document.createElement('div');
  grid.classList.add('feature-grid-items');
  items.forEach((row) => {
    const item = document.createElement('div');
    item.classList.add('feature-grid-item');
    const cols = [...row.children];
    if (cols[0]) {
      cols[0].classList.add('feature-grid-icon');
      item.append(cols[0]);
    }
    if (cols[1]) {
      cols[1].classList.add('feature-grid-text');
      item.append(cols[1]);
    }
    grid.append(item);
  });
  block.textContent = '';
  block.append(grid);
}
