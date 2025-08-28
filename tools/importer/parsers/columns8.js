/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the main two-column wrapper
  const twoCol = element.querySelector('.c-two-col-generic');
  if (!twoCol) return;

  // Find the row containing columns
  const row = twoCol.querySelector('.row');
  if (!row) return;

  // Get the two main columns
  const cols = row.querySelectorAll(':scope > div');
  if (cols.length < 2) return;

  // Left column: image background
  const imgCol = cols[0];
  let imgEl = null;
  // Try to extract the background image URL
  const bgStyle = imgCol.getAttribute('style') || '';
  const urlMatch = bgStyle.match(/background-image:\s*url\(["']?([^"')]+)["']?\)/);
  if (urlMatch && urlMatch[1]) {
    imgEl = document.createElement('img');
    imgEl.src = urlMatch[1];
    imgEl.alt = '';
  }

  // Right column: text content
  const textCol = cols[1];
  // Defensive: find the card content
  const cardContent = textCol.querySelector('.c-card__content') || textCol;

  // Compose the table rows
  const headerRow = ['Columns (columns8)'];
  const contentRow = [imgEl, cardContent];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace the original element
  element.replaceWith(table);
}
