/* eslint-disable */
/* global WebImporter */

import heroCarouselParser from './parsers/hero-carousel.js';
import cardsParser from './parsers/cards.js';
import columnsParser from './parsers/columns.js';
import heroParser from './parsers/hero.js';

import cleanupTransformer from './transformers/movistarplus-cleanup.js';
import sectionsTransformer from './transformers/movistarplus-sections.js';

const parsers = {
  'hero-carousel': heroCarouselParser,
  'cards': cardsParser,
  'columns': columnsParser,
  'hero': heroParser,
};

const PAGE_TEMPLATE = {
  name: 'homepage',
  description: 'Movistar Plus+ homepage with hero banners, content cards, promotional sections, and media highlights',
  urls: [
    'https://www.movistarplus.es',
  ],
  blocks: [
    {
      name: 'hero-carousel',
      instances: ['section.mplus-banner.mplus-banner--slider'],
    },
    {
      name: 'cards',
      instances: [
        'section.mplus-collection.mplus-collection--highlight#m64ba88277f47881e2325be36',
        'section.mplus-collection.mplus-collection__logos',
        'section.mplus-mosaic#m64be96b7c34988316053359c',
        'section.mplus-mosaic#m64bfe4887f47880f4d1c8ff2',
        'section.mplus-collection.mplus-collection__horizontal#m67efc3487f478827303e64d1',
        'section.mplus-mosaic#m64bfeb97c349883f0e668272',
        'section.mplus-collection.mplus-collection__vertical#m681cbc65c3498813c315f6bc',
        'section.mplus-mosaic#m654d15a0c349883e3e28242d',
        'section.mplus-mosaic#m654d13637f47883dc53d0cdf',
        'section.mplus-collection.mplus-collection--highlight.mplus-collection__couped-right#m66191b04c349885e443e0cf2',
        'section.mplus-collection.mplus-collection__horizontal.mplus-collection__grid--type3#m6938329bc349884fd4145182',
        'section.mplus-accordion',
      ],
    },
    {
      name: 'columns',
      instances: [
        'section.mplus-tarifas',
        'section.mplus-benefits#m661d31edc3498864727521d2',
        'section.mplus-benefits#m660fcb9fc3498859916b2440',
      ],
    },
    {
      name: 'hero',
      instances: [
        'section.mplus-cintillo#m65f8607f7f4788457b274356',
        'section.mplus-cintillo#m66a8f24c7f4788666e693db0',
        'section.mplus-price',
      ],
    },
  ],
  sections: [
    { id: 'section-1', name: 'Hero Banner Carousel', selector: 'section.mplus-banner.mplus-banner--slider', style: 'dark', blocks: ['hero-carousel'], defaultContent: [] },
    { id: 'section-2', name: 'Featured Collection Highlight', selector: 'section.mplus-collection.mplus-collection--highlight#m64ba88277f47881e2325be36', style: 'dark', blocks: ['cards'], defaultContent: ['section.mplus-collection--highlight#m64ba88277f47881e2325be36 h2'] },
    { id: 'section-3', name: 'Subscription Plans', selector: 'section.mplus-tarifas', style: 'dark', blocks: ['columns'], defaultContent: ['section.mplus-tarifas h2'] },
    { id: 'section-4', name: 'Benefits', selector: 'section.mplus-benefits#m661d31edc3498864727521d2', style: 'dark', blocks: ['columns'], defaultContent: [] },
    { id: 'section-5', name: 'Channel Logos', selector: 'section.mplus-collection.mplus-collection__logos', style: 'dark', blocks: ['cards'], defaultContent: ['section.mplus-collection__logos h2'] },
    { id: 'section-6', name: 'Content Mosaic - Series', selector: 'section.mplus-mosaic#m64be96b7c34988316053359c', style: 'dark', blocks: ['cards'], defaultContent: ['section.mplus-mosaic#m64be96b7c34988316053359c h2'] },
    { id: 'section-7', name: 'Promotional Banner 1', selector: 'section.mplus-cintillo#m65f8607f7f4788457b274356', style: 'dark', blocks: ['hero'], defaultContent: [] },
    { id: 'section-8', name: 'Content Mosaic - Cinema', selector: 'section.mplus-mosaic#m64bfe4887f47880f4d1c8ff2', style: 'dark', blocks: ['cards'], defaultContent: ['section.mplus-mosaic#m64bfe4887f47880f4d1c8ff2 h2'] },
    { id: 'section-9', name: 'Horizontal Collection', selector: 'section.mplus-collection.mplus-collection__horizontal#m67efc3487f478827303e64d1', style: 'dark', blocks: ['cards'], defaultContent: ['section.mplus-collection__horizontal#m67efc3487f478827303e64d1 h2'] },
    { id: 'section-10', name: 'Content Mosaic - Sports', selector: 'section.mplus-mosaic#m64bfeb97c349883f0e668272', style: 'dark', blocks: ['cards'], defaultContent: ['section.mplus-mosaic#m64bfeb97c349883f0e668272 h2'] },
    { id: 'section-11', name: 'Vertical Collection', selector: 'section.mplus-collection.mplus-collection__vertical#m681cbc65c3498813c315f6bc', style: 'dark', blocks: ['cards'], defaultContent: ['section.mplus-collection__vertical#m681cbc65c3498813c315f6bc h2'] },
    { id: 'section-12', name: 'Content Mosaic - More Series', selector: 'section.mplus-mosaic#m654d15a0c349883e3e28242d', style: 'dark', blocks: ['cards'], defaultContent: ['section.mplus-mosaic#m654d15a0c349883e3e28242d h2'] },
    { id: 'section-13', name: 'Content Mosaic - Entertainment', selector: 'section.mplus-mosaic#m654d13637f47883dc53d0cdf', style: 'dark', blocks: ['cards'], defaultContent: ['section.mplus-mosaic#m654d13637f47883dc53d0cdf h2'] },
    { id: 'section-14', name: 'Highlight Collection - Couped', selector: 'section.mplus-collection.mplus-collection--highlight.mplus-collection__couped-right#m66191b04c349885e443e0cf2', style: 'dark', blocks: ['cards'], defaultContent: ['section.mplus-collection__couped-right#m66191b04c349885e443e0cf2 h2'] },
    { id: 'section-15', name: 'Grid Collection', selector: 'section.mplus-collection.mplus-collection__horizontal.mplus-collection__grid--type3#m6938329bc349884fd4145182', style: 'dark', blocks: ['cards'], defaultContent: ['section.mplus-collection__grid--type3#m6938329bc349884fd4145182 h2'] },
    { id: 'section-16', name: 'Promotional Banner 2', selector: 'section.mplus-cintillo#m66a8f24c7f4788666e693db0', style: 'dark', blocks: ['hero'], defaultContent: [] },
    { id: 'section-17', name: 'Benefits - Bottom', selector: 'section.mplus-benefits#m660fcb9fc3498859916b2440', style: 'dark', blocks: ['columns'], defaultContent: [] },
    { id: 'section-18', name: 'Pricing CTA', selector: 'section.mplus-price', style: 'dark', blocks: ['hero'], defaultContent: [] },
    { id: 'section-19', name: 'FAQ Accordion', selector: 'section.mplus-accordion', style: 'dark', blocks: ['cards'], defaultContent: ['section.mplus-accordion h2'] },
  ],
};

const transformers = [
  cleanupTransformer,
  ...(PAGE_TEMPLATE.sections && PAGE_TEMPLATE.sections.length > 1 ? [sectionsTransformer] : []),
];

function executeTransformers(hookName, element, payload) {
  const enhancedPayload = { ...payload, template: PAGE_TEMPLATE };
  transformers.forEach((transformerFn) => {
    try {
      transformerFn.call(null, hookName, element, enhancedPayload);
    } catch (e) {
      console.error(`Transformer failed at ${hookName}:`, e);
    }
  });
}

function findBlocksOnPage(document, template) {
  const pageBlocks = [];
  template.blocks.forEach((blockDef) => {
    blockDef.instances.forEach((selector) => {
      const elements = document.querySelectorAll(selector);
      if (elements.length === 0) {
        console.warn(`Block "${blockDef.name}" selector not found: ${selector}`);
      }
      elements.forEach((element) => {
        pageBlocks.push({
          name: blockDef.name,
          selector,
          element,
          section: blockDef.section || null,
        });
      });
    });
  });
  console.log(`Found ${pageBlocks.length} block instances on page`);
  return pageBlocks;
}

export default {
  transform: (payload) => {
    const { document, url, params } = payload;
    const main = document.body;

    executeTransformers('beforeTransform', main, payload);

    const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);

    pageBlocks.forEach((block) => {
      const parser = parsers[block.name];
      if (parser) {
        try {
          parser(block.element, { document, url, params });
        } catch (e) {
          console.error(`Failed to parse ${block.name} (${block.selector}):`, e);
        }
      } else {
        console.warn(`No parser found for block: ${block.name}`);
      }
    });

    executeTransformers('afterTransform', main, payload);

    const hr = document.createElement('hr');
    main.appendChild(hr);
    WebImporter.rules.createMetadata(main, document);
    WebImporter.rules.transformBackgroundImages(main, document);
    WebImporter.rules.adjustImageUrls(main, url, params.originalURL);

    const path = WebImporter.FileUtils.sanitizePath(
      new URL(params.originalURL).pathname.replace(/\/$/, '').replace(/\.html$/, '') || '/index',
    );

    return [{
      element: main,
      path,
      report: {
        title: document.title,
        template: PAGE_TEMPLATE.name,
        blocks: pageBlocks.map((b) => b.name),
      },
    }];
  },
};
