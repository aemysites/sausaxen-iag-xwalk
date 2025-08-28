/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: get all immediate column containers
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // Each column's content: grab the main card content
  const columnCells = columns.map((col) => {
    // Find the product card content block
    const cardContent = col.querySelector('.c-card--product__content');
    // If not found, fallback to the whole column
    return cardContent || col;
  });

  // Table header row as specified
  const headerRow = ['Columns (columns11)'];
  // Second row: one cell per column
  const contentRow = columnCells;

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
