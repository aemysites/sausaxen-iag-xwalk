/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the first .c-accordion inside the element
  const accordion = element.querySelector('.c-accordion');
  if (!accordion) return;

  // Get all accordion items
  const items = accordion.querySelectorAll(':scope > .c-accordion__item');
  if (!items.length) return;

  // Build the rows: header first
  const rows = [
    ['Accordion'],
  ];

  items.forEach((item) => {
    // Title: find the .item-title span inside the button
    const btn = item.querySelector('button.c-accordion__header-button');
    let title = '';
    if (btn) {
      const span = btn.querySelector('.item-title');
      if (span) {
        title = span.textContent.trim();
      } else {
        title = btn.textContent.trim();
      }
    }

    // Content: find the .c-accordion__content__details div
    let content = '';
    const details = item.querySelector('.c-accordion__content__details');
    if (details) {
      // Use the whole details block as content (preserves links, formatting, etc)
      content = details;
    }

    // Push row: [title, content]
    rows.push([title, content]);
  });

  // Create the accordion block table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the block table
  element.replaceWith(table);
}
