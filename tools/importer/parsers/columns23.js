/* global WebImporter */
export default function parse(element, { document }) {
  // Find the .row inside the section
  const row = element.querySelector('.row');
  if (!row) return;
  // Get direct children (columns) -- expect two columns
  const columns = row.querySelectorAll(':scope > div');
  if (columns.length < 2) return;
  const leftCol = columns[0];
  const rightCol = columns[1];

  // LEFT: Only keep the heading element(s) in leftCol, reference it directly if found; otherwise, use leftCol
  let leftCell;
  const heading = leftCol.querySelector('h2,h1,h3,h4,h5,h6');
  leftCell = heading ? heading : leftCol;

  // RIGHT: Take all children of rightCol as a single array, filtering only element and non-empty text nodes
  const rightCell = Array.from(rightCol.childNodes).filter(node =>
    (node.nodeType === 1) || (node.nodeType === 3 && node.textContent.trim())
  );

  // Build the table array: header row, then one row with both columns
  const cells = [
    ['Columns (columns23)'],
    [leftCell, rightCell]
  ];

  // Create and replace
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
