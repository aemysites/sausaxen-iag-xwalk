/* global WebImporter */
export default function parse(element, { document }) {
  // Define the header row with the required block name
  const headerRow = ['Columns (columns25)'];

  // Find the main row containing the two columns
  const mainRow = element.querySelector('.c-free-text__content > .container > .row');
  if (!mainRow) return;

  // Try to find the two column divs (col-md-8 and col-md-4)
  const col1 = mainRow.querySelector('.col-md-8');
  const col2 = mainRow.querySelector('.col-md-4');
  // Defensive: ensure columns exist
  const columns = [];
  if (col1) columns.push(col1);
  if (col2) columns.push(col2);
  if (columns.length === 0) return;

  // Structure: header row, then a row for the columns
  const cells = [headerRow, columns];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}