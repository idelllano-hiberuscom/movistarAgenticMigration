export default function decorate(block) {
  const rows = [...block.children];
  if (rows.length === 0) return;

  const slides = [];
  rows.forEach((row) => {
    const slide = document.createElement('div');
    slide.classList.add('hero-carousel-slide');
    const cols = [...row.children];
    if (cols[0]) {
      cols[0].classList.add('hero-carousel-image');
      slide.append(cols[0]);
    }
    if (cols[1]) {
      cols[1].classList.add('hero-carousel-content');
      slide.append(cols[1]);
    }
    slides.push(slide);
  });

  block.textContent = '';

  const track = document.createElement('div');
  track.classList.add('hero-carousel-track');
  slides.forEach((s, i) => {
    if (i === 0) s.classList.add('active');
    track.append(s);
  });
  block.append(track);

  let current = 0;
  let interval;

  function resetAutoplay() {
    clearInterval(interval);
    // eslint-disable-next-line no-use-before-define
    interval = setInterval(() => goToSlide((current + 1) % slides.length), 5000);
  }

  function goToSlide(index) {
    slides[current].classList.remove('active');
    block.querySelectorAll('.hero-carousel-indicators button').forEach((d) => d.classList.remove('active'));
    current = index;
    slides[current].classList.add('active');
    const dots = block.querySelectorAll('.hero-carousel-indicators button');
    if (dots[current]) dots[current].classList.add('active');
    resetAutoplay();
  }

  if (slides.length > 1) {
    const indicators = document.createElement('div');
    indicators.classList.add('hero-carousel-indicators');
    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.setAttribute('aria-label', `Slide ${i + 1}`);
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goToSlide(i));
      indicators.append(dot);
    });
    block.append(indicators);
  }

  resetAutoplay();
}
