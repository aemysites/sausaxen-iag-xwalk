/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the main content row with two columns
  // The structure is: section > section > div.container > div.row > div.col-md-12 > ...
  // Inside: div.c-free-text__content > div.container > div.row > div.col-md-8 (text), div.col-xs-12.col-md-4 (svg)

  // Find the deepest .c-free-text__content
  const freeTextContent = element.querySelector('.c-free-text__content');
  if (!freeTextContent) return;

  // Find the inner .container > .row
  const innerContainer = freeTextContent.querySelector('.container');
  if (!innerContainer) return;
  const innerRow = innerContainer.querySelector('.row');
  if (!innerRow) return;

  // Find the two columns
  const columns = innerRow.querySelectorAll(':scope > div');
  if (columns.length < 2) return;

  // First column: text (h2 + p)
  const colText = columns[0];
  // Second column: svg logo
  const colSvg = columns[1];

  // For robustness, collect all children of each column
  const colTextContent = Array.from(colText.childNodes).filter(node => {
    // Only keep elements and non-empty text nodes
    return node.nodeType === 1 || (node.nodeType === 3 && node.textContent.trim());
  });
  const colSvgContent = Array.from(colSvg.childNodes).filter(node => {
    return node.nodeType === 1 || (node.nodeType === 3 && node.textContent.trim());
  });

  // Table header
  const headerRow = ['Columns (columns21)'];
  // Table content row: two columns
  const contentRow = [colTextContent, colSvgContent];

  // Create the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the original element
  element.replaceWith(table);
}
