/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the deepest content container
  let contentRow;
  // Try to find the inner .container > .row structure
  const containers = element.querySelectorAll('.container > .row');
  if (containers.length > 0) {
    contentRow = containers[containers.length - 1];
  } else {
    // fallback: use the first .row inside element
    contentRow = element.querySelector('.row');
  }
  if (!contentRow) return;

  // Find the two main columns
  const columns = contentRow.querySelectorAll(':scope > .col-xs-12');
  if (columns.length < 2) return;

  // First column: heading and paragraph
  const colLeft = columns[0];
  // Second column: badges (images)
  const colRight = columns[1];

  // Get heading and paragraph from left column
  const heading = colLeft.querySelector('h2');
  const paragraph = colLeft.querySelector('p');
  // Defensive: only add if exists
  const leftCellContent = [];
  if (heading) leftCellContent.push(heading);
  if (paragraph) leftCellContent.push(paragraph);

  // Get all images from right column
  // The images are inside .row > .col-xs-6
  const badgeCols = colRight.querySelectorAll(':scope > .row > .col-xs-6');
  const rightCellContent = [];
  badgeCols.forEach((badgeCol) => {
    const img = badgeCol.querySelector('img');
    if (img) rightCellContent.push(img);
  });

  // Build the table rows
  const headerRow = ['Columns (columns17)'];
  const contentRowCells = [leftCellContent, rightCellContent];
  const cells = [headerRow, contentRowCells];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(block);
}
