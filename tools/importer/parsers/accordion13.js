/* global WebImporter */
export default function parse(element, { document }) {
  // Prepare header row as per example
  const headerRow = ['Accordion (accordion13)', ''];

  // Find all immediate accordion items
  const items = Array.from(element.querySelectorAll(':scope > .c-accordion__item'));

  // Map each accordion item to [title, content] row
  const rows = items.map((item) => {
    // Title: get the .c-accordion__header-button > .item-title span, but fall back gracefully
    let titleEl = null;
    const button = item.querySelector('.c-accordion__header-button');
    if (button) {
      const span = button.querySelector('.item-title');
      titleEl = span || button;
    }
    // Content: Prefer .c-accordion__content__details, else .c-accordion__content, else wrapper
    let contentEl = item.querySelector('.c-accordion__content__details')
      || item.querySelector('.c-accordion__content')
      || item.querySelector('.c-accordion__content-wrapper');
    // If content also includes wrapper divs, just use top level contentEl
    return [titleEl, contentEl];
  });

  // Compose the block's content
  const cells = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
