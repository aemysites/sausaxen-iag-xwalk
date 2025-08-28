/* global WebImporter */
export default function parse(element, { document }) {
  // Get all accordion items
  const items = Array.from(element.querySelectorAll(':scope > .c-accordion__item'));

  // Table header row as per example (must have two columns: block name, empty)
  const headerRow = ['Accordion', ''];

  // Build rows for each accordion item
  const rows = items.map(item => {
    // Title cell: extract plain text from the title span
    const button = item.querySelector('.c-accordion__header-button');
    const titleSpan = button && button.querySelector('.item-title');
    const titleText = titleSpan ? titleSpan.textContent.trim() : (button ? button.textContent.trim() : '');

    // Content cell: get the details wrapper and extract only its children (not the wrapper div)
    const details = item.querySelector('.c-accordion__content__details');
    let contentChildren = [];
    if (details) {
      contentChildren = Array.from(details.childNodes).filter(node => {
        // Only include element nodes and text nodes with non-whitespace
        return node.nodeType === 1 || (node.nodeType === 3 && node.textContent.trim());
      });
    } else {
      // fallback: use all children of .c-accordion__content if details missing
      const fallback = item.querySelector('.c-accordion__content');
      if (fallback) {
        contentChildren = Array.from(fallback.childNodes).filter(node => {
          return node.nodeType === 1 || (node.nodeType === 3 && node.textContent.trim());
        });
      } else {
        contentChildren = [];
      }
    }

    return [titleText, contentChildren];
  });

  // Compose table data
  const tableData = [headerRow, ...rows];

  // Create block table
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace original element with block table
  element.replaceWith(block);
}
