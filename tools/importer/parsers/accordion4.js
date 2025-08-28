/* global WebImporter */
export default function parse(element, { document }) {
  if (!element || !element.classList.contains('c-accordion')) return;

  // Header row for the block table (must be single cell)
  const headerRow = ['Accordion'];

  // Get all accordion items
  const items = Array.from(element.querySelectorAll(':scope > .c-accordion__item'));

  // Build rows for each accordion item
  const rows = items.map((item) => {
    // Title cell: find the button with the title span
    const button = item.querySelector('.c-accordion__header-button');
    const titleSpan = button && button.querySelector('.item-title');
    // Use the span if present, otherwise fallback to button
    const titleCell = titleSpan || button;

    // Content cell: find the content details div
    const details = item.querySelector('.c-accordion__content__details');
    // Fallback to content wrapper if details missing
    const contentCell = details || item.querySelector('.c-accordion__content') || item;

    return [titleCell, contentCell];
  });

  // Compose the table data
  const cells = [headerRow, ...rows];

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(blockTable);
}
