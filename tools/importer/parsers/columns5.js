/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the main container for the block
  const mainContainer = element.querySelector('.container');
  if (!mainContainer) return;

  // Find the row containing columns
  const row = mainContainer.querySelector('.row');
  if (!row) return;

  // Get all immediate column divs (col-lg-4, col-lg-8)
  const columns = Array.from(row.children).filter(child => child.classList.contains('col-lg-4') || child.classList.contains('col-lg-8'));
  if (columns.length < 2) return;

  // First column: left side (heading, description, CTA)
  const leftCol = columns[0];
  // Second column: right side (FAQ links)
  const rightCol = columns[1];

  // Prepare left column content
  // We'll include the heading, description, and CTA as a single cell
  const leftContent = [];
  const heading = leftCol.querySelector('h2');
  if (heading) leftContent.push(heading);
  const desc = leftCol.querySelector('.c-how-it-works__header-content');
  if (desc) leftContent.push(desc);
  const cta = leftCol.querySelector('.c-how-it-works__header-cta');
  if (cta) leftContent.push(cta);

  // Prepare right column content
  // There are two .col-md-6 columns inside .row.m-t-2
  const rightInnerRow = rightCol.querySelector('.row.m-t-2');
  let rightCells = [];
  if (rightInnerRow) {
    const innerCols = Array.from(rightInnerRow.children).filter(child => child.classList.contains('col-md-6'));
    rightCells = innerCols.map(col => {
      // Each col contains several <p> with <a>
      return Array.from(col.children);
    });
  }

  // Defensive: ensure we have two right cells
  if (rightCells.length < 2) {
    // fallback: treat all links as one column
    const allLinks = rightCol.querySelectorAll('a');
    rightCells = [Array.from(allLinks)];
  }

  // Build the table rows
  const headerRow = ['Columns (columns5)'];
  const contentRow = [leftContent, ...rightCells];

  // Create the block table
  const cells = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
