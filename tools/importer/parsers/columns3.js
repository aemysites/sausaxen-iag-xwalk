/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid containing the columns
  const grid = element.querySelector('.grid');
  if (!grid) return;
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // Column 1: Title (left)
  const leftCol = columns[0];
  let col1 = [];
  const title = leftCol.querySelector('.cmp-title');
  if (title) col1.push(title);

  // Column 2: All right content split into two logical columns for columns3
  const rightCol = columns[1];
  const rightContent = rightCol.querySelector('.cmp-custom-columns__container .cmp-container');
  if (!rightContent) return;
  const blocks = Array.from(rightContent.children).filter(block => block && block.textContent.trim());

  // For columns3, split right content into two columns for a total of 3 columns
  // Heuristic: first 2 blocks (intro paragraphs) in col2, rest in col3
  let col2 = [];
  let col3 = [];
  blocks.forEach((block, i) => {
    if (i < 2) {
      col2.push(block);
    } else {
      col3.push(block);
    }
  });

  // Always produce exactly 3 columns for columns3, even if some are empty
  const contentRow = [col1, col2, col3];

  // Table header
  const headerRow = ['Columns (columns3)'];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the original element
  element.replaceWith(table);
}
