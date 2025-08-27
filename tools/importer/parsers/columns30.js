/* global WebImporter */
export default function parse(element, { document }) {
  // Find the .container inside the section (resilient to minor structure changes)
  const container = element.querySelector('.container');
  if (!container) return;
  // Find the .row inside the container
  const row = container.querySelector('.row');
  if (!row) return;
  // Get all immediate child columns in the row
  const cols = Array.from(row.querySelectorAll(':scope > div'));
  if (cols.length < 2) return;

  // Reference the actual elements for table cells
  // First cell: heading (could be more than one element)
  const col1 = cols[0];
  // Second cell: button links
  const col2 = cols[1];

  // Structure matches: Columns block with two columns, one row of content
  const headerRow = ['Columns (columns30)'];
  const contentRow = [col1, col2];

  const cells = [
    headerRow,
    contentRow
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}