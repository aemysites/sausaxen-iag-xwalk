/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: get the main calculator container
  const container = element;

  // Find the two main columns: form (left) and results (right)
  // They are direct children of the main container
  const formCol = container.querySelector('.c-refinance-calculator__form');
  const resultsCol = container.querySelector('.c-refinance-calculator__results');

  // Defensive: fallback if not found
  const left = formCol || document.createElement('div');
  const right = resultsCol || document.createElement('div');

  // Build the table rows
  const headerRow = ['Columns (columns1)'];
  const contentRow = [left, right];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the original element with the new table
  container.replaceWith(table);
}
