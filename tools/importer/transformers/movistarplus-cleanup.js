/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: Movistar Plus+ site-wide cleanup.
 * Removes non-authorable content (header, footer, cookie consent, tracking).
 * All selectors verified from captured DOM in migration-work/cleaned.html.
 */
const TransformHook = { beforeTransform: 'beforeTransform', afterTransform: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === TransformHook.beforeTransform) {
    // Remove OneTrust cookie consent SDK (overlay/banner blocking content)
    // Found in DOM: <div id="onetrust-consent-sdk"> (line 3348)
    WebImporter.DOMUtils.remove(element, ['#onetrust-consent-sdk']);

    // Remove empty anchor divs used for in-page navigation
    // Found in DOM: <div id="a66c59d1ec3498818d50ec4db" class="anchor"> (multiple instances)
    WebImporter.DOMUtils.remove(element, ['.anchor']);
  }

  if (hookName === TransformHook.afterTransform) {
    // Remove site header (navigation, logo, search, login)
    // Found in DOM: <header class="mplus-header scrolled"> (line 4)
    WebImporter.DOMUtils.remove(element, ['header.mplus-header']);

    // Remove site footer (links, social, legal)
    // Found in DOM: <footer class="mplus-footer"> (line 3062)
    WebImporter.DOMUtils.remove(element, ['footer.mplus-footer']);

    // Remove tracking/retargeting iframes
    // Found in DOM: mainadv.com retargeting iframe (line 3601), doubleclick pixel iframe (line 3604)
    WebImporter.DOMUtils.remove(element, ['iframe']);

    // Remove tracking container div
    // Found in DOM: <div id="m20D"> (line 3603)
    WebImporter.DOMUtils.remove(element, ['#m20D']);

    // Remove noscript tags (Google Tag Manager noscript)
    // Found in DOM: <!-- Google Tag Manager (noscript) --> (line 2)
    WebImporter.DOMUtils.remove(element, ['noscript']);

    // Remove link and source elements (not authorable)
    WebImporter.DOMUtils.remove(element, ['link', 'source']);

    // Clean up data-telemetry-meta attributes (tracking metadata)
    // Found in DOM: <body data-telemetry-meta="step:home"> (line 1)
    element.querySelectorAll('[data-telemetry-meta]').forEach((el) => {
      el.removeAttribute('data-telemetry-meta');
    });
  }
}
