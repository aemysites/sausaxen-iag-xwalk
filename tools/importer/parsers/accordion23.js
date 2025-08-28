/* global WebImporter */
export default function parse(element, { document }) {
  if (!element || !element.classList.contains('c-accordion')) return;

  // Header row: must be a single cell ['Accordion']
  const rows = [['Accordion']];

  // Each accordion item becomes a row with two cells
  const items = element.querySelectorAll(':scope > .c-accordion__item');
  items.forEach((item) => {
    // Title cell: get the .item-title span text
    const button = item.querySelector('.c-accordion__header-button');
    let title = '';
    if (button) {
      const span = button.querySelector('.item-title');
      title = span ? span.textContent.trim() : button.textContent.trim();
    }
    // Content cell: get the .c-accordion__content__details (or fallback)
    let content = '';
    const details = item.querySelector('.c-accordion__content__details');
    if (details) {
      content = details;
    } else {
      const contentDiv = item.querySelector('.c-accordion__content');
      if (contentDiv) content = contentDiv;
    }
    rows.push([title, content]);
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
