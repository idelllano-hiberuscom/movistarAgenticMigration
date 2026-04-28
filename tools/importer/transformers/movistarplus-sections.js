/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: Movistar Plus+ section breaks and section metadata.
 * Inserts <hr> between sections and adds Section Metadata blocks with style.
 * Section selectors from page-templates.json, validated against migration-work/cleaned.html.
 * Runs in afterTransform only, using payload.template.sections.
 */
const TransformHook = { beforeTransform: 'beforeTransform', afterTransform: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === TransformHook.afterTransform) {
    const { template } = payload;
    if (!template || !template.sections || template.sections.length < 2) {
      return;
    }

    const { document } = element.ownerDocument ? { document: element.ownerDocument } : { document };
    const sections = template.sections;

    // Process sections in reverse order to avoid DOM position shifts
    for (let i = sections.length - 1; i >= 0; i--) {
      const section = sections[i];
      const sectionEl = element.querySelector(section.selector);

      if (!sectionEl) {
        continue;
      }

      // Add Section Metadata block after section element when style is defined
      if (section.style) {
        const sectionMetadata = WebImporter.Blocks.createBlock(document, {
          name: 'Section Metadata',
          cells: {
            style: section.style,
          },
        });
        sectionEl.after(sectionMetadata);
      }

      // Insert <hr> before non-first sections to create section breaks
      if (i > 0) {
        const hr = document.createElement('hr');
        sectionEl.before(hr);
      }
    }
  }
}
