/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the main row containing columns
  const row = element.querySelector('.row');
  if (!row) return;

  // Get the two main column divs
  const columns = row.querySelectorAll(':scope > div');
  if (columns.length < 2) return;

  // First column: heading
  const col1 = columns[0];
  // Second column: content (paragraph, list, button)
  const col2 = columns[1];

  // Table header row
  const headerRow = ['Columns (columns22)'];

  // Table content row: each column as a cell
  const contentRow = [col1, col2];

  // Build table
  const cells = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element with block
  element.replaceWith(block);
}
