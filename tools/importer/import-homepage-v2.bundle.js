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

  // tools/importer/import-homepage-v2.js
  var import_homepage_v2_exports = {};
  __export(import_homepage_v2_exports, {
    default: () => import_homepage_v2_default
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

  // tools/importer/parsers/card-list.js
  function parse2(element, { document }) {
    const rows = [];
    const content = element.querySelector(".mplus-collection__content") || element;
    const img = content.querySelector("img");
    const title = content.querySelector("h2, h3, .mplus-collection__title");
    const subtitle = content.querySelector(".mplus-collection__subtitle");
    const desc = content.querySelector(".mplus-collection__text");
    const cta = content.querySelector('a.mplus-button, a[href*="contratar"], a[href*="funcionalidades"]');
    const imgCell = document.createElement("div");
    if (img) {
      const pic = document.createElement("picture");
      const newImg = document.createElement("img");
      newImg.src = img.src;
      newImg.alt = img.alt || "";
      pic.append(newImg);
      imgCell.append(pic);
    }
    const textCell = document.createElement("div");
    if (subtitle) {
      const p1 = document.createElement("p");
      p1.textContent = subtitle.textContent.trim();
      textCell.append(p1);
    }
    if (title) {
      const h = document.createElement("h3");
      h.textContent = title.textContent.trim();
      textCell.append(h);
    }
    if (desc) {
      const p2 = document.createElement("p");
      p2.textContent = desc.textContent.trim();
      textCell.append(p2);
    }
    if (cta) {
      const a = document.createElement("a");
      a.href = cta.href;
      a.textContent = cta.textContent.trim();
      textCell.append(a);
    }
    if (imgCell.children.length > 0 || textCell.children.length > 0) {
      rows.push([imgCell, textCell]);
    }
    if (rows.length === 0) return;
    const table = WebImporter.DOMUtils.createTable([["Card List"], ...rows], document);
    element.replaceWith(table);
  }

  // tools/importer/parsers/pricing.js
  function parse3(element, { document }) {
    const wrapper = element.querySelector(".wrapper");
    const container = wrapper ? wrapper.querySelector(":scope > div") : element;
    const plans = container ? container.querySelectorAll(":scope > div") : [];
    const rows = [];
    plans.forEach((plan) => {
      const h3 = plan.querySelector("h3");
      const img = plan.querySelector("img");
      const lis = plan.querySelectorAll("li");
      const cta = plan.querySelector('a.mplus-button, a[href*="contratar"], a[href*="planes"]');
      const imgCell = document.createElement("div");
      if (img) {
        const pic = document.createElement("picture");
        const newImg = document.createElement("img");
        newImg.src = img.src;
        newImg.alt = img.alt || "";
        pic.append(newImg);
        imgCell.append(pic);
      }
      const textCell = document.createElement("div");
      if (h3) {
        const heading = document.createElement("h3");
        heading.textContent = h3.textContent.trim();
        textCell.append(heading);
      }
      if (lis.length > 0) {
        const ul = document.createElement("ul");
        lis.forEach((li) => {
          const newLi = document.createElement("li");
          newLi.textContent = li.textContent.trim();
          ul.append(newLi);
        });
        textCell.append(ul);
      }
      if (cta) {
        const a = document.createElement("a");
        a.href = cta.href;
        a.textContent = cta.textContent.trim();
        textCell.append(a);
      }
      if (imgCell.children.length > 0 || textCell.children.length > 0) {
        rows.push([imgCell, textCell]);
      }
    });
    if (rows.length === 0) return;
    const table = WebImporter.DOMUtils.createTable([["Pricing"], ...rows], document);
    element.replaceWith(table);
  }

  // tools/importer/parsers/feature-grid.js
  function parse4(element, { document }) {
    const boxes = element.querySelectorAll(".mplus-benefits__box");
    const rows = [];
    boxes.forEach((box) => {
      const img = box.querySelector("img");
      const heading = box.querySelector("h3, h4, strong");
      const desc = box.querySelector("p");
      const imgCell = document.createElement("div");
      if (img) {
        const pic = document.createElement("picture");
        const newImg = document.createElement("img");
        newImg.src = img.src;
        newImg.alt = img.alt || "";
        pic.append(newImg);
        imgCell.append(pic);
      }
      const textCell = document.createElement("div");
      if (heading) {
        const h = document.createElement("h3");
        h.textContent = heading.textContent.trim();
        textCell.append(h);
      }
      if (desc) {
        const p = document.createElement("p");
        p.textContent = desc.textContent.trim();
        textCell.append(p);
      }
      if (imgCell.children.length > 0 || textCell.children.length > 0) {
        rows.push([imgCell, textCell]);
      }
    });
    if (rows.length === 0) return;
    const table = WebImporter.DOMUtils.createTable([["Feature Grid"], ...rows], document);
    element.replaceWith(table);
  }

  // tools/importer/parsers/logo-wall.js
  function parse5(element, { document }) {
    const items = element.querySelectorAll("li");
    const rows = [];
    items.forEach((item) => {
      const img = item.querySelector("img");
      if (!img) return;
      const cell = document.createElement("div");
      const pic = document.createElement("picture");
      const newImg = document.createElement("img");
      newImg.src = img.src;
      newImg.alt = img.alt || "";
      pic.append(newImg);
      cell.append(pic);
      rows.push([cell]);
    });
    if (rows.length === 0) return;
    const table = WebImporter.DOMUtils.createTable([["Logo Wall"], ...rows], document);
    element.replaceWith(table);
  }

  // tools/importer/parsers/mosaic.js
  function parse6(element, { document }) {
    const items = element.querySelectorAll("li");
    const rows = [];
    items.forEach((item) => {
      var _a;
      const img = item.querySelector("img");
      const titleEl = item.querySelector(".title, h3, h4");
      const pretitle = item.querySelector(".pretitle");
      const link = item.querySelector("a");
      const imgCell = document.createElement("div");
      if (img) {
        const pic = document.createElement("picture");
        const newImg = document.createElement("img");
        newImg.src = img.src;
        newImg.alt = img.alt || "";
        pic.append(newImg);
        imgCell.append(pic);
      }
      const textCell = document.createElement("div");
      if (pretitle) {
        const p = document.createElement("p");
        p.textContent = pretitle.textContent.trim();
        textCell.append(p);
      }
      if (titleEl) {
        const h = document.createElement("h3");
        h.textContent = titleEl.textContent.trim();
        textCell.append(h);
      }
      if (link) {
        const a = document.createElement("a");
        a.href = link.href;
        a.textContent = link.textContent.trim() || ((_a = titleEl == null ? void 0 : titleEl.textContent) == null ? void 0 : _a.trim()) || "Ver m\xE1s";
        if (textCell.children.length === 0) textCell.append(a);
      }
      if (imgCell.children.length > 0 || textCell.children.length > 0) {
        rows.push([imgCell, textCell]);
      }
    });
    if (rows.length === 0) return;
    const table = WebImporter.DOMUtils.createTable([["Mosaic"], ...rows], document);
    element.replaceWith(table);
  }

  // tools/importer/parsers/banner.js
  function parse7(element, { document }) {
    const img = element.querySelector(".mplus-cintillo__image img, img");
    const textEl = element.querySelector(".mplus-cintillo__text, p, h2, h3");
    const link = element.querySelector("a");
    const imgCell = document.createElement("div");
    if (img) {
      const pic = document.createElement("picture");
      const newImg = document.createElement("img");
      newImg.src = img.src;
      newImg.alt = img.alt || "";
      pic.append(newImg);
      imgCell.append(pic);
    }
    const textCell = document.createElement("div");
    if (textEl) {
      const p = document.createElement("p");
      p.textContent = textEl.textContent.trim();
      textCell.append(p);
    }
    if (link) {
      const a = document.createElement("a");
      a.href = link.href;
      a.textContent = link.textContent.trim() || "Ver m\xE1s";
      textCell.append(a);
    }
    if (imgCell.children.length === 0 && textCell.children.length === 0) return;
    const table = WebImporter.DOMUtils.createTable([["Banner"], [imgCell, textCell]], document);
    element.replaceWith(table);
  }

  // tools/importer/parsers/carousel.js
  function parse8(element, { document }) {
    const items = element.querySelectorAll("li");
    const rows = [];
    items.forEach((item) => {
      var _a;
      const img = item.querySelector("img");
      const title = item.querySelector(".title, h3, h4, span");
      const link = item.querySelector("a");
      const imgCell = document.createElement("div");
      if (img) {
        const pic = document.createElement("picture");
        const newImg = document.createElement("img");
        newImg.src = img.src;
        newImg.alt = img.alt || "";
        pic.append(newImg);
        imgCell.append(pic);
      }
      const textCell = document.createElement("div");
      if (title) {
        const h = document.createElement("h3");
        h.textContent = title.textContent.trim();
        textCell.append(h);
      }
      if (link) {
        const a = document.createElement("a");
        a.href = link.href;
        a.textContent = link.textContent.trim() || ((_a = title == null ? void 0 : title.textContent) == null ? void 0 : _a.trim()) || "Ver m\xE1s";
        if (textCell.children.length === 0) textCell.append(a);
      }
      if (imgCell.children.length > 0 || textCell.children.length > 0) {
        rows.push([imgCell, textCell]);
      }
    });
    if (rows.length === 0) return;
    const table = WebImporter.DOMUtils.createTable([["Carousel"], ...rows], document);
    element.replaceWith(table);
  }

  // tools/importer/parsers/gallery.js
  function parse9(element, { document }) {
    const items = element.querySelectorAll("li");
    const rows = [];
    items.forEach((item) => {
      const img = item.querySelector("img");
      const link = item.querySelector("a");
      if (!img) return;
      const imgCell = document.createElement("div");
      const pic = document.createElement("picture");
      const newImg = document.createElement("img");
      newImg.src = img.src;
      newImg.alt = img.alt || "";
      pic.append(newImg);
      imgCell.append(pic);
      const textCell = document.createElement("div");
      if (link) {
        const a = document.createElement("a");
        a.href = link.href;
        a.textContent = img.alt || "Ver m\xE1s";
        textCell.append(a);
      }
      rows.push([imgCell, textCell]);
    });
    if (rows.length === 0) return;
    const table = WebImporter.DOMUtils.createTable([["Gallery"], ...rows], document);
    element.replaceWith(table);
  }

  // tools/importer/parsers/cta.js
  function parse10(element, { document }) {
    const heading = element.querySelector("h2, h3, .section-header__title");
    const cta = element.querySelector('a.mplus-button, a[href*="contratar"]');
    const cell = document.createElement("div");
    if (heading) {
      const h = document.createElement("h2");
      h.textContent = heading.textContent.trim();
      cell.append(h);
    }
    if (cta) {
      const a = document.createElement("a");
      a.href = cta.href;
      a.textContent = cta.textContent.trim();
      cell.append(a);
    }
    if (cell.children.length === 0) return;
    const table = WebImporter.DOMUtils.createTable([["CTA"], [cell]], document);
    element.replaceWith(table);
  }

  // tools/importer/parsers/accordion.js
  function parse11(element, { document }) {
    const questions = element.querySelectorAll(".mplus-accordion__question");
    const answers = element.querySelectorAll(".mplus-accordion__text");
    const rows = [];
    questions.forEach((q, i) => {
      const qCell = document.createElement("div");
      const h = document.createElement("h3");
      h.textContent = q.textContent.trim();
      qCell.append(h);
      const aCell = document.createElement("div");
      const answer = answers[i];
      if (answer) {
        const ps = answer.querySelectorAll("p, li, div");
        if (ps.length > 0) {
          ps.forEach((p) => {
            const text = p.textContent.trim();
            if (text) {
              const para = document.createElement("p");
              para.textContent = text;
              aCell.append(para);
            }
          });
        } else {
          const text = answer.textContent.trim();
          if (text) {
            const para = document.createElement("p");
            para.textContent = text;
            aCell.append(para);
          }
        }
      }
      if (qCell.children.length > 0) {
        rows.push([qCell, aCell]);
      }
    });
    if (rows.length === 0) return;
    const table = WebImporter.DOMUtils.createTable([["Accordion"], ...rows], document);
    element.replaceWith(table);
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

  // tools/importer/import-homepage-v2.js
  var parsers = {
    "hero-carousel": parse,
    "card-list": parse2,
    "pricing": parse3,
    "feature-grid": parse4,
    "logo-wall": parse5,
    "mosaic": parse6,
    "banner": parse7,
    "carousel": parse8,
    "gallery": parse9,
    "cta": parse10,
    "accordion": parse11
  };
  var PAGE_TEMPLATE = {
    name: "homepage-v2",
    description: "Movistar Plus+ homepage with 11 granular blocks across 19 sections",
    urls: ["https://www.movistarplus.es"],
    blocks: [
      { name: "hero-carousel", instances: ["section.mplus-banner.mplus-banner--slider"] },
      { name: "card-list", instances: ["section.mplus-collection.mplus-collection--highlight#m64ba88277f47881e2325be36", "section.mplus-collection.mplus-collection--highlight.mplus-collection__couped-right#m66191b04c349885e443e0cf2"] },
      { name: "pricing", instances: ["section.mplus-tarifas"] },
      { name: "feature-grid", instances: ["section.mplus-benefits#m661d31edc3498864727521d2", "section.mplus-benefits#m660fcb9fc3498859916b2440"] },
      { name: "logo-wall", instances: ["section.mplus-collection.mplus-collection__logos"] },
      { name: "mosaic", instances: ["section.mplus-mosaic#m64be96b7c34988316053359c", "section.mplus-mosaic#m64bfe4887f47880f4d1c8ff2", "section.mplus-mosaic#m64bfeb97c349883f0e668272", "section.mplus-mosaic#m654d15a0c349883e3e28242d", "section.mplus-mosaic#m654d13637f47883dc53d0cdf"] },
      { name: "banner", instances: ["section.mplus-cintillo#m65f8607f7f4788457b274356", "section.mplus-cintillo#m66a8f24c7f4788666e693db0"] },
      { name: "carousel", instances: ["section.mplus-collection.mplus-collection__horizontal#m67efc3487f478827303e64d1", "section.mplus-collection.mplus-collection__horizontal.mplus-collection__grid--type3#m6938329bc349884fd4145182"] },
      { name: "gallery", instances: ["section.mplus-collection.mplus-collection__vertical#m681cbc65c3498813c315f6bc"] },
      { name: "cta", instances: ["section.mplus-price"] },
      { name: "accordion", instances: ["section.mplus-accordion"] }
    ],
    sections: [
      { id: "section-1", name: "Hero Banner Carousel", selector: "section.mplus-banner.mplus-banner--slider", style: "dark", blocks: ["hero-carousel"], defaultContent: [] },
      { id: "section-2", name: "Featured Collection", selector: "section.mplus-collection.mplus-collection--highlight#m64ba88277f47881e2325be36", style: "dark", blocks: ["card-list"], defaultContent: ["section.mplus-collection--highlight#m64ba88277f47881e2325be36 h2"] },
      { id: "section-3", name: "Subscription Plans", selector: "section.mplus-tarifas", style: "dark", blocks: ["pricing"], defaultContent: ["section.mplus-tarifas h2"] },
      { id: "section-4", name: "Benefits", selector: "section.mplus-benefits#m661d31edc3498864727521d2", style: "dark", blocks: ["feature-grid"], defaultContent: [] },
      { id: "section-5", name: "Channel Logos", selector: "section.mplus-collection.mplus-collection__logos", style: "dark", blocks: ["logo-wall"], defaultContent: ["section.mplus-collection__logos h2"] },
      { id: "section-6", name: "Mosaic Series", selector: "section.mplus-mosaic#m64be96b7c34988316053359c", style: "dark", blocks: ["mosaic"], defaultContent: ["section.mplus-mosaic#m64be96b7c34988316053359c h2"] },
      { id: "section-7", name: "Promo Banner 1", selector: "section.mplus-cintillo#m65f8607f7f4788457b274356", style: "dark", blocks: ["banner"], defaultContent: [] },
      { id: "section-8", name: "Mosaic Cinema", selector: "section.mplus-mosaic#m64bfe4887f47880f4d1c8ff2", style: "dark", blocks: ["mosaic"], defaultContent: ["section.mplus-mosaic#m64bfe4887f47880f4d1c8ff2 h2"] },
      { id: "section-9", name: "Horizontal Collection", selector: "section.mplus-collection.mplus-collection__horizontal#m67efc3487f478827303e64d1", style: "dark", blocks: ["carousel"], defaultContent: ["section.mplus-collection__horizontal#m67efc3487f478827303e64d1 h2"] },
      { id: "section-10", name: "Mosaic Sports", selector: "section.mplus-mosaic#m64bfeb97c349883f0e668272", style: "dark", blocks: ["mosaic"], defaultContent: ["section.mplus-mosaic#m64bfeb97c349883f0e668272 h2"] },
      { id: "section-11", name: "Vertical Collection", selector: "section.mplus-collection.mplus-collection__vertical#m681cbc65c3498813c315f6bc", style: "dark", blocks: ["gallery"], defaultContent: ["section.mplus-collection__vertical#m681cbc65c3498813c315f6bc h2"] },
      { id: "section-12", name: "Mosaic More Series", selector: "section.mplus-mosaic#m654d15a0c349883e3e28242d", style: "dark", blocks: ["mosaic"], defaultContent: ["section.mplus-mosaic#m654d15a0c349883e3e28242d h2"] },
      { id: "section-13", name: "Mosaic Entertainment", selector: "section.mplus-mosaic#m654d13637f47883dc53d0cdf", style: "dark", blocks: ["mosaic"], defaultContent: ["section.mplus-mosaic#m654d13637f47883dc53d0cdf h2"] },
      { id: "section-14", name: "Highlight Couped", selector: "section.mplus-collection.mplus-collection--highlight.mplus-collection__couped-right#m66191b04c349885e443e0cf2", style: "dark", blocks: ["card-list"], defaultContent: ["section.mplus-collection__couped-right#m66191b04c349885e443e0cf2 h2"] },
      { id: "section-15", name: "Grid Collection", selector: "section.mplus-collection.mplus-collection__horizontal.mplus-collection__grid--type3#m6938329bc349884fd4145182", style: "dark", blocks: ["carousel"], defaultContent: ["section.mplus-collection__grid--type3#m6938329bc349884fd4145182 h2"] },
      { id: "section-16", name: "Promo Banner 2", selector: "section.mplus-cintillo#m66a8f24c7f4788666e693db0", style: "dark", blocks: ["banner"], defaultContent: [] },
      { id: "section-17", name: "Benefits Bottom", selector: "section.mplus-benefits#m660fcb9fc3498859916b2440", style: "dark", blocks: ["feature-grid"], defaultContent: [] },
      { id: "section-18", name: "Pricing CTA", selector: "section.mplus-price", style: "dark", blocks: ["cta"], defaultContent: [] },
      { id: "section-19", name: "FAQ Accordion", selector: "section.mplus-accordion", style: "dark", blocks: ["accordion"], defaultContent: ["section.mplus-accordion h2"] }
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
  var import_homepage_v2_default = {
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
      const path = "/movistarplusagenticmigration/home-migrada";
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
  return __toCommonJS(import_homepage_v2_exports);
})();
