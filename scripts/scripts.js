import {
  decorateBlocks,
  decorateIcons,
  decorateSections,
  decorateTemplateAndTheme,
  getMetadata,       
  loadCSS,
  loadFooter,
  loadHeader,
  loadSections,
  sampleRUM,
  waitForFirstImage,
} from './aem.js';

function getAllMetadata(scope) {
  return [...document.head.querySelectorAll(`meta[name^="${scope}-"],meta[property^="${scope}:"]`)]
    .reduce((res, meta) => {
      const key = meta.name ? meta.name.replace(`${scope}-`, '') : meta.getAttribute('property').replace(`${scope}:`, '');
      res[key] = meta.content;
      return res;
    }, {});
}

const pluginContext = {
  getAllMetadata,
  getMetadata,
  decorateBlock: () => {},
  decorateButtons: () => {},
  decorateIcons,
  decorateSections,
  decorateBlocks,
  loadBlock: () => Promise.resolve(),
  loadCSS,
  sampleRUM,
};

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

  if (getMetadata('experiment')
    || Object.keys(getAllMetadata('campaign')).length
    || Object.keys(getAllMetadata('audience')).length) {
    const { loadEager: runEager } = await import('../plugins/experimentation/src/index.js');
    await runEager(document, {}, pluginContext);
  }

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

  // ← AÑADIR ESTO AL FINAL DE loadLazy
  if (getMetadata('experiment')
    || Object.keys(getAllMetadata('campaign')).length
    || Object.keys(getAllMetadata('audience')).length) {
    const { loadLazy: runLazy } = await import('../plugins/experimentation/src/index.js');
    await runLazy(document, {}, pluginContext);
  }
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