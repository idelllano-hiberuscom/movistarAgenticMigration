import { decorateBlock, loadBlock } from '../../scripts/aem.js';

const fetchNav = async () => {
  const response = await fetch('/nav.plain.html');
  if (!response.ok) {
    // eslint-disable-next-line no-console
    console.warn('Header: failed to load /nav');
    return null;
  }
  const html = await response.text();
  return new DOMParser().parseFromString(html, 'text/html');
};

/**
 * loads and decorates the block
 * @param {Element} block The block element
 */
export default async function decorate(block) {
  const navDoc = await fetchNav();
  if (!navDoc) return;

  const navMain = navDoc.querySelector('main');
  if (!navMain) return;

  const navBlock = navMain.querySelector('.site-header')
    || navMain.querySelector('div > div > div');
  if (!navBlock) return;

  const headerContent = navBlock.cloneNode(true);

  block.textContent = '';
  block.append(headerContent);

  decorateBlock(headerContent);
  await loadBlock(headerContent);
}
