/* eslint-disable */
/* global WebImporter */

/**
 * Parser for hero-carousel
 * Base block: hero
 * Source: https://www.movistarplus.es
 * Selector: section.mplus-banner.mplus-banner--slider
 * Generated: 2026-04-28
 *
 * Extracts carousel slides from a banner slider section.
 * Each slide produces two rows: image (background) and text (heading + description + CTA).
 * Field hints added for xwalk Universal Editor integration.
 *
 * UE Model fields (hero):
 *   - image (reference) -> background picture per slide
 *   - imageAlt (collapsed, no hint)
 *   - text (richtext) -> heading + description + CTA per slide
 */
export default function parse(element, { document }) {
  // Select all carousel slide items
  const allSlides = element.querySelectorAll('li.mplus-banner__item');

  // Deduplicate slides: carousels often clone first/last slides for infinite scroll.
  // Track seen slides by their background image src to avoid duplicate rows.
  const seenImages = new Set();
  const slides = [];
  allSlides.forEach((slide) => {
    const bgImg = slide.querySelector('.mplus-banner__background img');
    const imgSrc = bgImg ? bgImg.getAttribute('src') : null;
    if (imgSrc && seenImages.has(imgSrc)) return;
    if (imgSrc) seenImages.add(imgSrc);
    slides.push(slide);
  });

  const cells = [];

  slides.forEach((slide) => {
    // --- Row 1: Image (background image) ---
    const bgPicture = slide.querySelector('.mplus-banner__background picture');
    if (bgPicture) {
      const imageCell = document.createDocumentFragment();
      imageCell.appendChild(document.createComment(' field:image '));
      imageCell.appendChild(bgPicture.cloneNode(true));
      cells.push([imageCell]);
    }

    // --- Row 2: Text (heading + description + CTA) ---
    const textCell = document.createDocumentFragment();
    textCell.appendChild(document.createComment(' field:text '));

    // Heading: h1 or h2 with class mplus-banner__title
    const heading = slide.querySelector('h1.mplus-banner__title, h2.mplus-banner__title');
    if (heading) {
      textCell.appendChild(heading.cloneNode(true));
    }

    // Description text
    const descriptionDiv = slide.querySelector('.mplus-banner__text');
    if (descriptionDiv) {
      const descParagraphs = descriptionDiv.querySelectorAll('p');
      descParagraphs.forEach((p) => {
        textCell.appendChild(p.cloneNode(true));
      });
    }

    // CTA button link
    const ctaLink = slide.querySelector('a.mplus-button');
    if (ctaLink) {
      const p = document.createElement('p');
      const link = ctaLink.cloneNode(true);
      // Preserve strong styling for the CTA
      const strong = document.createElement('strong');
      strong.appendChild(link);
      p.appendChild(strong);
      textCell.appendChild(p);
    }

    cells.push([textCell]);
  });

  const block = WebImporter.Blocks.createBlock(document, {
    name: 'hero-carousel',
    cells,
  });

  element.replaceWith(block);
}
