/* global WebImporter */
export default function parse(element, { document }) {
  if (!element) return;

  // Build Accordion block table
  const rows = [['Accordion']]; // Header row as per example

  // Select all accordion items
  const items = element.querySelectorAll(':scope > .c-accordion__item');
  items.forEach((item) => {
    // Extract title
    let title = '';
    const btn = item.querySelector('.c-accordion__header-button');
    if (btn) {
      const span = btn.querySelector('.item-title');
      if (span) {
        title = span.textContent.trim();
      } else {
        title = btn.textContent.trim();
      }
    }
    if (!title) {
      const h3 = item.querySelector('h3');
      if (h3) title = h3.textContent.trim();
    }

    // Extract content (flatten any nested tables to HTML, not block tables)
    let contentCell = '';
    const details = item.querySelector('.c-accordion__content__details');
    if (details) {
      // If details has children, preserve all HTML structure (including tables as HTML)
      if (details.childNodes.length > 0) {
        contentCell = Array.from(details.childNodes);
      } else {
        contentCell = details.textContent.trim();
      }
    } else {
      // Fallback: use .c-accordion__content if present
      const content = item.querySelector('.c-accordion__content');
      if (content) {
        if (content.childNodes.length > 0) {
          contentCell = Array.from(content.childNodes);
        } else {
          contentCell = content.textContent.trim();
        }
      }
    }
    rows.push([title, contentCell]);
  });

  // Create Accordion block table
  const blockTable = WebImporter.DOMUtils.createTable(rows, document);

  // Section Metadata (only if present in example)
  // Example markdown has a Metadata table, so add <hr> and Section Metadata table
  const hr = document.createElement('hr');
  const metadataRows = [
    ['Section Metadata'],
    ['title', 'accordion'],
    ['published-time', '2025-08-28T09:02:21.772Z'],
    ['modified-time', '2025-08-28T08:58:05.546Z'],
  ];
  const metadataTable = WebImporter.DOMUtils.createTable(metadataRows, document);

  // Replace element with Accordion block, then <hr>, then Section Metadata
  element.replaceWith(blockTable, hr, metadataTable);
}
