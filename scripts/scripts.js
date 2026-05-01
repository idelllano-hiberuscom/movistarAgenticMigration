import {
  decorateBlocks,
  decorateIcons,
  decorateSections,
  decorateTemplateAndTheme,
  loadCSS,
  loadFooter,
  loadHeader,
  loadSections,
  sampleRUM,
  waitForFirstImage,
} from './aem.js';

function decorateMain(main) {
  decorateSections(main);
  decorateBlocks(main);
  decorateIcons(main);
}

export { decorateMain };
export default decorateMain;

async function loadEager(doc) {
  document.documentElement.lang = 'es';
  decorateTemplateAndTheme();

  const main = doc.querySelector('main');
  if (main) {
    decorateMain(main);

    const firstSection = main.querySelector('.section');
    if (firstSection) {
      await waitForFirstImage(firstSection);
    }
  }
}

async function loadLazy(doc) {
  const main = doc.querySelector('main');
  if (main) {
    await loadSections(main);
  }

  const header = doc.querySelector('header');
  if (header) {
    await loadHeader(header);
  }

  const footer = doc.querySelector('footer');
  if (footer) {
    await loadFooter(footer);
  }

  loadCSS('/styles/fonts.css');
  loadCSS('/styles/lazy-styles.css');
  sampleRUM('lazy');
}

function loadDelayed() {
  window.setTimeout(() => {
    import('./delayed.js');
  }, 3000);
}

async function loadPage() {
  await loadEager(document);
  await loadLazy(document);
  loadDelayed();
}

loadPage();
