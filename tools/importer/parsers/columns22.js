/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main row containing the columns
  const row = element.querySelector('.row');
  if (!row) return;
  // Get direct child columns (usually col-lg-4 and col-lg-8)
  const cols = row.querySelectorAll(':scope > div');
  // Only proceed if we have at least two columns
  if (cols.length < 2) return;

  // Reference the original column elements (no cloning)
  const leftCol = cols[0];
  const rightCol = cols[1];

  // Compose the table structure
  const cells = [
    ['Columns (columns22)'], // Header row, matches example
    [leftCol, rightCol]      // 2 columns in the second row
  ];

  // Create the block table using the helper
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
