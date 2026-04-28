var CustomImportScript = (() => {
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // tools/importer/import-homepage.js
  var import_homepage_exports = {};
  __export(import_homepage_exports, {
    default: () => import_homepage_default
  });

  // tools/importer/parsers/hero-carousel.js
  function parse(element, { document }) {
    const allSlides = element.querySelectorAll("li.mplus-banner__item");
    const seenImages = /* @__PURE__ */ new Set();
    const slides = [];
    allSlides.forEach((slide) => {
      const bgImg = slide.querySelector(".mplus-banner__background img");
      const imgSrc = bgImg ? bgImg.getAttribute("src") : null;
      if (imgSrc && seenImages.has(imgSrc)) return;
      if (imgSrc) seenImages.add(imgSrc);
      slides.push(slide);
    });
    const cells = [];
    slides.forEach((slide) => {
      const bgPicture = slide.querySelector(".mplus-banner__background picture");
      if (bgPicture) {
        const imageCell = document.createDocumentFragment();
        imageCell.appendChild(document.createComment(" field:image "));
        imageCell.appendChild(bgPicture.cloneNode(true));
        cells.push([imageCell]);
      }
      const textCell = document.createDocumentFragment();
      textCell.appendChild(document.createComment(" field:text "));
      const heading = slide.querySelector("h1.mplus-banner__title, h2.mplus-banner__title");
      if (heading) {
        textCell.appendChild(heading.cloneNode(true));
      }
      const descriptionDiv = slide.querySelector(".mplus-banner__text");
      if (descriptionDiv) {
        const descParagraphs = descriptionDiv.querySelectorAll("p");
        descParagraphs.forEach((p) => {
          textCell.appendChild(p.cloneNode(true));
        });
      }
      const ctaLink = slide.querySelector("a.mplus-button");
      if (ctaLink) {
        const p = document.createElement("p");
        const link = ctaLink.cloneNode(true);
        const strong = document.createElement("strong");
        strong.appendChild(link);
        p.appendChild(strong);
        textCell.appendChild(p);
      }
      cells.push([textCell]);
    });
    const block = WebImporter.Blocks.createBlock(document, {
      name: "hero-carousel",
      cells
    });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards.js
  function parse2(element, { document }) {
    let items = Array.from(element.querySelectorAll(":scope .wrapper ul > li, :scope ul > li"));
    if (items.length === 0) {
      items = Array.from(element.querySelectorAll(':scope .mplus-accordion__item, :scope [class*="accordion"] > div'));
    }
    if (items.length === 0) {
      items = Array.from(element.querySelectorAll(":scope .wrapper > div > div, :scope > div > div"));
    }
    const cells = [];
    items.forEach((item) => {
      const img = item.querySelector("picture, img");
      let pictureEl = null;
      if (img) {
        pictureEl = img.tagName === "PICTURE" ? img : img.closest("picture") || img;
      }
      const textParts = [];
      const title = item.querySelector('h1, h2, h3, h4, [class*="title"]:not([class*="subtitle"])');
      if (title) {
        textParts.push(title);
      }
      const subtitle = item.querySelector('[class*="subtitle"], .mplus-collection__subtitle');
      if (subtitle) {
        textParts.push(subtitle);
      }
      const textContainer = item.querySelector('[class*="text"], [class*="description"], [class*="data"]');
      if (textContainer) {
        const paragraphs = Array.from(textContainer.querySelectorAll("p"));
        paragraphs.forEach((p) => textParts.push(p));
      } else {
        const directParas = Array.from(item.querySelectorAll('p:not([class*="subtitle"])'));
        directParas.forEach((p) => {
          if (p !== subtitle && p !== title) {
            textParts.push(p);
          }
        });
      }
      const ctaLinks = Array.from(item.querySelectorAll('a.mplus-button, a[class*="button"], a[class*="cta"], a[class*="btn"]'));
      ctaLinks.forEach((link) => {
        const alreadyCaptured = textParts.some((part) => part.contains(link));
        if (!alreadyCaptured) {
          textParts.push(link);
        }
      });
      if (textParts.length === 0) {
        const infoDiv = item.querySelector('[class*="info"], [class*="content"], [class*="body"]');
        if (infoDiv) {
          Array.from(infoDiv.children).forEach((child) => textParts.push(child));
        }
      }
      if (!pictureEl && textParts.length === 0) {
        return;
      }
      let imageCell;
      if (pictureEl) {
        const imgFrag = document.createDocumentFragment();
        imgFrag.appendChild(document.createComment(" field:image "));
        imgFrag.appendChild(pictureEl);
        imageCell = imgFrag;
      } else {
        imageCell = "";
      }
      let textCell;
      if (textParts.length > 0) {
        const textFrag = document.createDocumentFragment();
        textFrag.appendChild(document.createComment(" field:text "));
        textParts.forEach((part) => textFrag.appendChild(part));
        textCell = textFrag;
      } else {
        textCell = "";
      }
      cells.push([imageCell, textCell]);
    });
    if (cells.length === 0) {
      cells.push(["", ""]);
    }
    const block = WebImporter.Blocks.createBlock(document, { name: "cards", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/columns.js
  function parse3(element, { document }) {
    let columnItems = Array.from(element.querySelectorAll(".mplus-hero-info__details"));
    if (columnItems.length === 0) {
      columnItems = Array.from(element.querySelectorAll(".mplus-benefits__box"));
    }
    if (columnItems.length === 0) {
      const container = element.querySelector(".mplus-hero-info__containerDetails, .mplus-benefits__container, .wrapper > ul, .wrapper > div");
      if (container) {
        columnItems = Array.from(container.children).filter((child) => child.tagName === "DIV" || child.tagName === "LI");
      }
    }
    const row = [];
    columnItems.forEach((col) => {
      const cellContent = [];
      const img = col.querySelector(".mplus-hero-info__icon img, img");
      if (img) {
        cellContent.push(img);
      }
      const title = col.querySelector("h3, h4, .mplus-hero-info__titlebox");
      if (title) {
        cellContent.push(title);
      }
      const list = col.querySelector("ul");
      if (list) {
        cellContent.push(list);
      }
      if (!list) {
        const paragraphs = Array.from(col.querySelectorAll("p"));
        paragraphs.forEach((p) => cellContent.push(p));
      }
      const priceBlock = col.querySelector(".mplus-hero-price");
      if (priceBlock) {
        const priceNumber = priceBlock.querySelector(".mplus-hero-price__number span");
        const priceDecimals = priceBlock.querySelector(".mplus-hero-price__decimals");
        const pricePeriod = priceBlock.querySelector(".mplus-hero-price__temp");
        const priceNote = priceBlock.querySelector(".mplus-hero-price__text");
        if (priceNumber || priceDecimals) {
          const pricePara = document.createElement("p");
          const priceStr = (priceNumber ? priceNumber.textContent : "") + (priceDecimals ? priceDecimals.textContent : "");
          const periodStr = pricePeriod ? "/" + pricePeriod.textContent.trim() : "";
          const strong = document.createElement("strong");
          strong.textContent = priceStr + periodStr;
          pricePara.appendChild(strong);
          cellContent.push(pricePara);
        }
        if (priceNote && priceNote.textContent.trim()) {
          const notePara = document.createElement("p");
          notePara.textContent = priceNote.textContent.trim();
          cellContent.push(notePara);
        }
      }
      const ctas = Array.from(col.querySelectorAll('.mplus-hero-info__cta a, a.mplus-button, a.mplus-btn, a[class*="button"], a[class*="cta"]'));
      const seenHrefs = /* @__PURE__ */ new Set();
      ctas.forEach((cta) => {
        if (!seenHrefs.has(cta.href)) {
          seenHrefs.add(cta.href);
          cellContent.push(cta);
        }
      });
      if (cellContent.length > 0) {
        row.push(cellContent);
      }
    });
    const cells = [];
    if (row.length > 0) {
      cells.push(row);
    }
    const block = WebImporter.Blocks.createBlock(document, { name: "columns", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/hero.js
  function parse4(element, { document }) {
    const cells = [];
    const imageCell = [];
    const cintilloImg = element.querySelector(".mplus-cintillo__image picture");
    const directImg = element.querySelector(":scope > img");
    const anyPicture = element.querySelector("picture");
    const image = cintilloImg || anyPicture || directImg;
    if (image) {
      const fieldHintImage = document.createComment(" field:image ");
      const frag = document.createDocumentFragment();
      frag.appendChild(fieldHintImage);
      frag.appendChild(image);
      imageCell.push(frag);
    }
    cells.push(imageCell);
    const textCell = [];
    const cintilloText = element.querySelector(".mplus-cintillo__text");
    const fieldHintText = document.createComment(" field:text ");
    const textFrag = document.createDocumentFragment();
    textFrag.appendChild(fieldHintText);
    if (cintilloText) {
      const p = document.createElement("p");
      while (cintilloText.firstChild) {
        p.appendChild(cintilloText.firstChild);
      }
      textFrag.appendChild(p);
    } else {
      const heading = element.querySelector('h1, h2, h3, h4, [class*="title"]');
      const description = element.querySelector('p, [class*="description"], [class*="subtitle"]');
      const links = Array.from(element.querySelectorAll("a"));
      if (heading) textFrag.appendChild(heading);
      if (description) textFrag.appendChild(description);
      links.forEach((link) => {
        if (heading && heading.contains(link)) return;
        if (description && description.contains(link)) return;
        textFrag.appendChild(link);
      });
    }
    textCell.push(textFrag);
    cells.push(textCell);
    const block = WebImporter.Blocks.createBlock(document, { name: "hero", cells });
    element.replaceWith(block);
  }

  // tools/importer/transformers/movistarplus-cleanup.js
  var TransformHook = { beforeTransform: "beforeTransform", afterTransform: "afterTransform" };
  function transform(hookName, element, payload) {
    if (hookName === TransformHook.beforeTransform) {
      WebImporter.DOMUtils.remove(element, ["#onetrust-consent-sdk"]);
      WebImporter.DOMUtils.remove(element, [".anchor"]);
    }
    if (hookName === TransformHook.afterTransform) {
      WebImporter.DOMUtils.remove(element, ["header.mplus-header"]);
      WebImporter.DOMUtils.remove(element, ["footer.mplus-footer"]);
      WebImporter.DOMUtils.remove(element, ["iframe"]);
      WebImporter.DOMUtils.remove(element, ["#m20D"]);
      WebImporter.DOMUtils.remove(element, ["noscript"]);
      WebImporter.DOMUtils.remove(element, ["link", "source"]);
      element.querySelectorAll("[data-telemetry-meta]").forEach((el) => {
        el.removeAttribute("data-telemetry-meta");
      });
    }
  }

  // tools/importer/transformers/movistarplus-sections.js
  var TransformHook2 = { beforeTransform: "beforeTransform", afterTransform: "afterTransform" };
  function transform2(hookName, element, payload) {
    if (hookName === TransformHook2.afterTransform) {
      const { template } = payload;
      if (!template || !template.sections || template.sections.length < 2) {
        return;
      }
      const { document } = element.ownerDocument ? { document: element.ownerDocument } : { document };
      const sections = template.sections;
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        const sectionEl = element.querySelector(section.selector);
        if (!sectionEl) {
          continue;
        }
        if (section.style) {
          const sectionMetadata = WebImporter.Blocks.createBlock(document, {
            name: "Section Metadata",
            cells: {
              style: section.style
            }
          });
          sectionEl.after(sectionMetadata);
        }
        if (i > 0) {
          const hr = document.createElement("hr");
          sectionEl.before(hr);
        }
      }
    }
  }

  // tools/importer/import-homepage.js
  var parsers = {
    "hero-carousel": parse,
    "cards": parse2,
    "columns": parse3,
    "hero": parse4
  };
  var PAGE_TEMPLATE = {
    name: "homepage",
    description: "Movistar Plus+ homepage with hero banners, content cards, promotional sections, and media highlights",
    urls: [
      "https://www.movistarplus.es"
    ],
    blocks: [
      {
        name: "hero-carousel",
        instances: ["section.mplus-banner.mplus-banner--slider"]
      },
      {
        name: "cards",
        instances: [
          "section.mplus-collection.mplus-collection--highlight#m64ba88277f47881e2325be36",
          "section.mplus-collection.mplus-collection__logos",
          "section.mplus-mosaic#m64be96b7c34988316053359c",
          "section.mplus-mosaic#m64bfe4887f47880f4d1c8ff2",
          "section.mplus-collection.mplus-collection__horizontal#m67efc3487f478827303e64d1",
          "section.mplus-mosaic#m64bfeb97c349883f0e668272",
          "section.mplus-collection.mplus-collection__vertical#m681cbc65c3498813c315f6bc",
          "section.mplus-mosaic#m654d15a0c349883e3e28242d",
          "section.mplus-mosaic#m654d13637f47883dc53d0cdf",
          "section.mplus-collection.mplus-collection--highlight.mplus-collection__couped-right#m66191b04c349885e443e0cf2",
          "section.mplus-collection.mplus-collection__horizontal.mplus-collection__grid--type3#m6938329bc349884fd4145182",
          "section.mplus-accordion"
        ]
      },
      {
        name: "columns",
        instances: [
          "section.mplus-tarifas",
          "section.mplus-benefits#m661d31edc3498864727521d2",
          "section.mplus-benefits#m660fcb9fc3498859916b2440"
        ]
      },
      {
        name: "hero",
        instances: [
          "section.mplus-cintillo#m65f8607f7f4788457b274356",
          "section.mplus-cintillo#m66a8f24c7f4788666e693db0",
          "section.mplus-price"
        ]
      }
    ],
    sections: [
      { id: "section-1", name: "Hero Banner Carousel", selector: "section.mplus-banner.mplus-banner--slider", style: "dark", blocks: ["hero-carousel"], defaultContent: [] },
      { id: "section-2", name: "Featured Collection Highlight", selector: "section.mplus-collection.mplus-collection--highlight#m64ba88277f47881e2325be36", style: "dark", blocks: ["cards"], defaultContent: ["section.mplus-collection--highlight#m64ba88277f47881e2325be36 h2"] },
      { id: "section-3", name: "Subscription Plans", selector: "section.mplus-tarifas", style: "dark", blocks: ["columns"], defaultContent: ["section.mplus-tarifas h2"] },
      { id: "section-4", name: "Benefits", selector: "section.mplus-benefits#m661d31edc3498864727521d2", style: "dark", blocks: ["columns"], defaultContent: [] },
      { id: "section-5", name: "Channel Logos", selector: "section.mplus-collection.mplus-collection__logos", style: "dark", blocks: ["cards"], defaultContent: ["section.mplus-collection__logos h2"] },
      { id: "section-6", name: "Content Mosaic - Series", selector: "section.mplus-mosaic#m64be96b7c34988316053359c", style: "dark", blocks: ["cards"], defaultContent: ["section.mplus-mosaic#m64be96b7c34988316053359c h2"] },
      { id: "section-7", name: "Promotional Banner 1", selector: "section.mplus-cintillo#m65f8607f7f4788457b274356", style: "dark", blocks: ["hero"], defaultContent: [] },
      { id: "section-8", name: "Content Mosaic - Cinema", selector: "section.mplus-mosaic#m64bfe4887f47880f4d1c8ff2", style: "dark", blocks: ["cards"], defaultContent: ["section.mplus-mosaic#m64bfe4887f47880f4d1c8ff2 h2"] },
      { id: "section-9", name: "Horizontal Collection", selector: "section.mplus-collection.mplus-collection__horizontal#m67efc3487f478827303e64d1", style: "dark", blocks: ["cards"], defaultContent: ["section.mplus-collection__horizontal#m67efc3487f478827303e64d1 h2"] },
      { id: "section-10", name: "Content Mosaic - Sports", selector: "section.mplus-mosaic#m64bfeb97c349883f0e668272", style: "dark", blocks: ["cards"], defaultContent: ["section.mplus-mosaic#m64bfeb97c349883f0e668272 h2"] },
      { id: "section-11", name: "Vertical Collection", selector: "section.mplus-collection.mplus-collection__vertical#m681cbc65c3498813c315f6bc", style: "dark", blocks: ["cards"], defaultContent: ["section.mplus-collection__vertical#m681cbc65c3498813c315f6bc h2"] },
      { id: "section-12", name: "Content Mosaic - More Series", selector: "section.mplus-mosaic#m654d15a0c349883e3e28242d", style: "dark", blocks: ["cards"], defaultContent: ["section.mplus-mosaic#m654d15a0c349883e3e28242d h2"] },
      { id: "section-13", name: "Content Mosaic - Entertainment", selector: "section.mplus-mosaic#m654d13637f47883dc53d0cdf", style: "dark", blocks: ["cards"], defaultContent: ["section.mplus-mosaic#m654d13637f47883dc53d0cdf h2"] },
      { id: "section-14", name: "Highlight Collection - Couped", selector: "section.mplus-collection.mplus-collection--highlight.mplus-collection__couped-right#m66191b04c349885e443e0cf2", style: "dark", blocks: ["cards"], defaultContent: ["section.mplus-collection__couped-right#m66191b04c349885e443e0cf2 h2"] },
      { id: "section-15", name: "Grid Collection", selector: "section.mplus-collection.mplus-collection__horizontal.mplus-collection__grid--type3#m6938329bc349884fd4145182", style: "dark", blocks: ["cards"], defaultContent: ["section.mplus-collection__grid--type3#m6938329bc349884fd4145182 h2"] },
      { id: "section-16", name: "Promotional Banner 2", selector: "section.mplus-cintillo#m66a8f24c7f4788666e693db0", style: "dark", blocks: ["hero"], defaultContent: [] },
      { id: "section-17", name: "Benefits - Bottom", selector: "section.mplus-benefits#m660fcb9fc3498859916b2440", style: "dark", blocks: ["columns"], defaultContent: [] },
      { id: "section-18", name: "Pricing CTA", selector: "section.mplus-price", style: "dark", blocks: ["hero"], defaultContent: [] },
      { id: "section-19", name: "FAQ Accordion", selector: "section.mplus-accordion", style: "dark", blocks: ["cards"], defaultContent: ["section.mplus-accordion h2"] }
    ]
  };
  var transformers = [
    transform,
    ...PAGE_TEMPLATE.sections && PAGE_TEMPLATE.sections.length > 1 ? [transform2] : []
  ];
  function executeTransformers(hookName, element, payload) {
    const enhancedPayload = __spreadProps(__spreadValues({}, payload), { template: PAGE_TEMPLATE });
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
            section: blockDef.section || null
          });
        });
      });
    });
    console.log(`Found ${pageBlocks.length} block instances on page`);
    return pageBlocks;
  }
  var import_homepage_default = {
    transform: (payload) => {
      const { document, url, params } = payload;
      const main = document.body;
      executeTransformers("beforeTransform", main, payload);
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
      executeTransformers("afterTransform", main, payload);
      const hr = document.createElement("hr");
      main.appendChild(hr);
      WebImporter.rules.createMetadata(main, document);
      WebImporter.rules.transformBackgroundImages(main, document);
      WebImporter.rules.adjustImageUrls(main, url, params.originalURL);
      const path = WebImporter.FileUtils.sanitizePath(
        new URL(params.originalURL).pathname.replace(/\/$/, "").replace(/\.html$/, "") || "/index"
      );
      return [{
        element: main,
        path,
        report: {
          title: document.title,
          template: PAGE_TEMPLATE.name,
          blocks: pageBlocks.map((b) => b.name)
        }
      }];
    }
  };
  return __toCommonJS(import_homepage_exports);
})();
