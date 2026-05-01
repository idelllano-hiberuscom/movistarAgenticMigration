export default function decorate(block) {
  const cols = [...block.firstElementChild.children];
  block.classList.add(`columns-${cols.length}-cols`);

  cols.forEach((col) => {
    col.classList.add('columns-col');
    const pic = col.querySelector('picture');
    if (pic) {
      const picWrapper = pic.closest('p') || pic.parentElement;
      if (picWrapper && picWrapper.children.length === 1) {
        picWrapper.classList.add('columns-img-col');
      }
    }
  });
}
