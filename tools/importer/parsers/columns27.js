/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the main row containing columns
  const row = element.querySelector('.row');
  if (!row) return;

  // Get all immediate column divs
  const columns = Array.from(row.children);
  if (columns.length < 2) return;

  // Prepare header row
  const headerRow = ['Columns (columns27)'];

  // Prepare content row: each cell is the full column content
  const contentRow = columns.map(col => col);

  // Build table
  const cells = [headerRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(table);
}
