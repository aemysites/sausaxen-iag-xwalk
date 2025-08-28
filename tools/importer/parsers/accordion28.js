/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: check for accordion items
  const items = element.querySelectorAll(':scope > .c-accordion__item');
  if (!items.length) return;

  // Header row as per markdown example
  const headerRow = ['Accordion'];
  const rows = [headerRow];

  items.forEach((item) => {
    // Title cell: find the .item-title span inside the button
    let title = '';
    const button = item.querySelector('.c-accordion__header-button');
    if (button) {
      const titleSpan = button.querySelector('.item-title');
      if (titleSpan) {
        // Use the span directly for formatting
        title = titleSpan;
      } else {
        // fallback: use button text
        title = document.createTextNode(button.textContent.trim());
      }
    }

    // Content cell: find the .c-accordion__content__details div
    let content = '';
    const details = item.querySelector('.c-accordion__content__details');
    if (details) {
      content = details;
    } else {
      // fallback: try to get the content wrapper
      const contentWrapper = item.querySelector('.c-accordion__content');
      if (contentWrapper) {
        content = contentWrapper;
      } else {
        // fallback: empty
        content = document.createTextNode('');
      }
    }

    rows.push([title, content]);
  });

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the block table
  element.replaceWith(table);
}
