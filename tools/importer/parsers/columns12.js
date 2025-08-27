/* global WebImporter */
export default function parse(element, { document }) {
  // The header row must be a single cell, even if the block is multi-column
  const headerRow = ['Columns (columns12)'];

  // Get the grid container
  const grid = element.querySelector('.container-grid');
  if (!grid) {
    // fallback in case structure changes
    const block = WebImporter.DOMUtils.createTable([
      headerRow,
      [element]
    ], document);
    element.replaceWith(block);
    return;
  }

  // Get columns
  const contentCol = grid.querySelector('.c-hero-header-key-callout__content-wrapper');
  const imageCol = grid.querySelector('.c-hero-header-key-callout__image-wrapper');

  // Prepare left column
  const leftContent = contentCol || document.createTextNode('');

  // Prepare right column (image)
  let rightContent = document.createTextNode('');
  if (imageCol) {
    let imageUrl = imageCol.style.getPropertyValue('--image-large') || imageCol.style.getPropertyValue('--image-medium') || imageCol.style.getPropertyValue('--image-small');
    let srcMatch = imageUrl && imageUrl.match(/url\(['"]?(.*?)['"]?\)/);
    if (srcMatch && srcMatch[1]) {
      const img = document.createElement('img');
      img.src = srcMatch[1];
      img.alt = '';
      rightContent = img;
    }
  }

  // Structure: first row header (single cell), second row with 2 columns
  const cells = [
    headerRow,
    [leftContent, rightContent]
  ];

  // Create and replace
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
