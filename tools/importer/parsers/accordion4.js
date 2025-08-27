/* global WebImporter */
export default function parse(element, { document }) {
  // Block header matches example exactly
  const headerRow = ['Accordion (accordion4)'];

  // Select all immediate accordion item children
  const itemDivs = Array.from(element.querySelectorAll(':scope > .c-accordion__item'));

  const rows = itemDivs.map((itemDiv) => {
    // Extract title: find the .c-accordion__header-button, then its .item-title span, else fallback to button itself
    let titleEl = itemDiv.querySelector('.c-accordion__header-button .item-title');
    if (!titleEl) {
      const button = itemDiv.querySelector('button');
      titleEl = button || document.createElement('span'); // fallback empty span if missing
    }

    // Extract content: find the content details div, else fallback to .c-accordion__content, else wrapper, else empty div
    let contentEl = itemDiv.querySelector('.c-accordion__content__details');
    if (!contentEl) {
      contentEl = itemDiv.querySelector('.c-accordion__content');
    }
    if (!contentEl) {
      contentEl = itemDiv.querySelector('.c-accordion__content-wrapper');
    }
    if (!contentEl) {
      contentEl = document.createElement('div'); // fallback empty div if missing
    }

    // Place both title and content in their own cells
    return [titleEl, contentEl];
  });

  // Build the final table data array
  const tableData = [headerRow, ...rows];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the new table
  element.replaceWith(block);
}
