/* global WebImporter */
export default function parse(element, { document }) {
  // Header row exactly as specified
  const headerRow = ['Accordion (accordion32)'];
  const rows = [headerRow];

  // Select all accordion items
  const items = element.querySelectorAll(':scope > .c-accordion__item');

  items.forEach((item) => {
    // Title cell: use the span with class 'item-title', fallback to button text if needed
    let titleCell;
    const titleSpan = item.querySelector('.item-title');
    if (titleSpan) {
      titleCell = titleSpan;
    } else {
      const btn = item.querySelector('button');
      titleCell = document.createElement('span');
      titleCell.textContent = btn ? btn.textContent.trim() : '';
    }

    // Content cell: use the details div with class 'c-accordion__content__details', fallback to .c-accordion__content if needed
    let contentCell;
    const detailsDiv = item.querySelector('.c-accordion__content__details');
    if (detailsDiv) {
      contentCell = detailsDiv;
    } else {
      const contentDiv = item.querySelector('.c-accordion__content');
      contentCell = contentDiv ? contentDiv : document.createElement('div');
    }

    // Add the row for this accordion item
    rows.push([titleCell, contentCell]);
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element with the new table
  element.replaceWith(block);
}
