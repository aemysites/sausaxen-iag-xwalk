/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Only proceed if element exists and has children
  if (!element || !element.children || !element.classList.contains('c-accordion')) return;

  // Prepare the header row for the Accordion block
  const headerRow = ['Accordion'];
  const rows = [headerRow];

  // Get all accordion items (direct children)
  const items = element.querySelectorAll(':scope > .c-accordion__item');

  items.forEach((item) => {
    // Title cell: Find the button with the title span
    let titleCell = '';
    const button = item.querySelector('.c-accordion__header-button');
    if (button) {
      const titleSpan = button.querySelector('.item-title');
      if (titleSpan) {
        // Use the span element directly for semantic markup
        titleCell = titleSpan;
      } else {
        // Fallback: Use button text
        titleCell = document.createTextNode(button.textContent.trim());
      }
    }

    // Content cell: Find the details content
    let contentCell;
    const details = item.querySelector('.c-accordion__content__details');
    if (details) {
      // Use the details element directly (includes all paragraphs, lists, etc)
      contentCell = details;
    } else {
      // Fallback: Try to find the content wrapper
      const contentWrapper = item.querySelector('.c-accordion__content');
      contentCell = contentWrapper ? contentWrapper : document.createTextNode('');
    }

    // Add this item as a row: [title, content]
    rows.push([titleCell, contentCell]);
  });

  // Create the Accordion block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
