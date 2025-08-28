/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: ensure element exists
  if (!element) return;

  // Table header as per markdown example
  const headerRow = ['Accordion'];

  // Get all accordion items (immediate children)
  const items = Array.from(element.querySelectorAll(':scope > .c-accordion__item'));

  // Build rows for each accordion item
  const rows = items.map(item => {
    // Title cell: find the button with the span.item-title
    let title = '';
    const button = item.querySelector('.c-accordion__header-button');
    if (button) {
      const span = button.querySelector('.item-title');
      if (span) {
        title = span.textContent.trim();
      } else {
        title = button.textContent.trim();
      }
    }

    // Content cell: find the details div
    let contentCell;
    const details = item.querySelector('.c-accordion__content__details');
    if (details) {
      // Use the details block directly for resilience
      contentCell = details;
    } else {
      // Fallback: try to find the content wrapper
      const content = item.querySelector('.c-accordion__content');
      contentCell = content || document.createElement('div');
    }

    return [title, contentCell];
  });

  // Compose the table data
  const tableData = [headerRow, ...rows];

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the block table
  element.replaceWith(blockTable);
}
