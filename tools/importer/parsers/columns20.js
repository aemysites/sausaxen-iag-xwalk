/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the main row containing the columns
  const row = element.querySelector('.row');
  if (!row) return;

  // Get the two main column divs
  const columns = row.querySelectorAll(':scope > div');
  if (columns.length < 2) return;

  // Reference the left column (title)
  const leftCol = columns[0];
  // Reference the right column (features list)
  const rightCol = columns[1];

  // Table header row
  const headerRow = ['Columns (columns20)'];
  // Table content row: two columns side by side
  const contentRow = [leftCol, rightCol];

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
