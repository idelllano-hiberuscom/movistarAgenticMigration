/**
 * loads and decorates the block
 * @param {Element} block The block element
 */
export default function decorate(block) {
  const rows = Array.from(block.children);

  const moveChildren = (from, to) => {
    if (!from) return;
    while (from.firstChild) {
      to.append(from.firstChild);
    }
  };

  const headerRow = rows.find((row) => !row.querySelector('picture') && row.querySelector('h1, h2, h3, h4, h5, h6'));
  const slideRows = rows.filter((row) => row.querySelector('picture'));

  const wrapper = document.createElement('div');
  wrapper.className = 'hero-carousel__wrapper';

  if (headerRow) {
    const header = document.createElement('div');
    header.className = 'hero-carousel__header';
    moveChildren(headerRow, header);
    wrapper.append(header);
  }

  const track = document.createElement('div');
  track.className = 'hero-carousel__track';
  track.setAttribute('role', 'list');

  const slides = [];

  slideRows.forEach((row, index) => {
    const cells = Array.from(row.children);
    const mediaCell = cells[0];
    const contentCell = cells[1];
    const offerCell = cells[2];

    const slide = document.createElement('div');
    slide.className = 'hero-carousel__slide';
    slide.setAttribute('role', 'listitem');

    const media = document.createElement('div');
    media.className = 'hero-carousel__media';
    const picture = mediaCell ? mediaCell.querySelector('picture') : null;
    if (picture) {
      const img = picture.querySelector('img');
      if (img) {
        img.loading = index === 0 ? 'eager' : 'lazy';
        img.decoding = 'async';
      }
      media.append(picture);
    }

    const content = document.createElement('div');
    content.className = 'hero-carousel__content';
    moveChildren(contentCell, content);

    const offer = document.createElement('div');
    offer.className = 'hero-carousel__offer';
    moveChildren(offerCell, offer);

    const overlay = document.createElement('div');
    overlay.className = 'hero-carousel__overlay';
    overlay.append(content, offer);

    slide.append(media, overlay);
    track.append(slide);
    slides.push(slide);
  });

  wrapper.append(track);

  if (slides.length > 1) {
    const controls = document.createElement('div');
    controls.className = 'hero-carousel__controls';

    const prev = document.createElement('button');
    prev.type = 'button';
    prev.className = 'hero-carousel__control hero-carousel__control--prev';
    prev.innerHTML = '<span aria-hidden="true">&larr;</span><span class="sr-only">Previous</span>';

    const next = document.createElement('button');
    next.type = 'button';
    next.className = 'hero-carousel__control hero-carousel__control--next';
    next.innerHTML = '<span aria-hidden="true">&rarr;</span><span class="sr-only">Next</span>';

    let currentIndex = 0;
    const scrollToIndex = (index) => {
      const target = slides[index];
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', inline: 'start' });
        currentIndex = index;
      }
    };

    prev.addEventListener('click', () => {
      const nextIndex = currentIndex === 0 ? slides.length - 1 : currentIndex - 1;
      scrollToIndex(nextIndex);
    });

    next.addEventListener('click', () => {
      const nextIndex = currentIndex === slides.length - 1 ? 0 : currentIndex + 1;
      scrollToIndex(nextIndex);
    });

    controls.append(prev, next);
    wrapper.append(controls);

    if (block.classList.contains('autoplay')) {
      let timerId = null;
      const start = () => {
        timerId = window.setInterval(() => {
          const nextIndex = currentIndex === slides.length - 1 ? 0 : currentIndex + 1;
          scrollToIndex(nextIndex);
        }, 7000);
      };

      const stop = () => {
        if (timerId) window.clearInterval(timerId);
      };

      start();
      block.addEventListener('mouseenter', stop);
      block.addEventListener('mouseleave', start);
    }
  }

  block.textContent = '';
  block.append(wrapper);
}
