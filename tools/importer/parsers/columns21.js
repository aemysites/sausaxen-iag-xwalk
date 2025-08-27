/* global WebImporter */
export default function parse(element, { document }) {
  // Locate the columns row inside nested containers
  let colsRow = null;
  // Try to find deepest row with columns structure
  const rows = element.querySelectorAll('.c-free-text__content .container .row');
  if (rows.length > 0) {
    colsRow = rows[0];
  } else {
    // fallback for structural variation
    colsRow = element.querySelector('.row');
  }
  if (!colsRow) return;

  // Find direct column divs (should be 2: left and right)
  const colDivs = colsRow.querySelectorAll(':scope > div');
  if (colDivs.length !== 2) return;

  // Left Column: Should contain text (h2 + p)
  const leftCol = colDivs[0];
  // Collect all direct children of leftCol
  const leftContent = Array.from(leftCol.children);

  // Right Column: Should contain images
  const rightCol = colDivs[1];
  // Images are inside a nested row
  const imgRow = rightCol.querySelector('.row');
  let rightContent = [];
  if (imgRow) {
    // Find all col-xs-6 containing images
    const imgCols = imgRow.querySelectorAll(':scope > div');
    imgCols.forEach(col => {
      // Each col should contain one image
      const img = col.querySelector('img');
      if (img) rightContent.push(img);
    });
  }

  // Fallback: If no images found, push all children
  if (rightContent.length === 0) {
    rightContent = Array.from(rightCol.children);
  }

  // Table header must match exactly
  const headerRow = ['Columns (columns21)'];
  // Second row: two columns, left is text, right is images
  const contentRow = [leftContent, rightContent];
  const cells = [headerRow, contentRow];

  // Create block table and replace original element
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
