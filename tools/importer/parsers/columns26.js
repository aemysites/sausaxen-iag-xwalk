/* global WebImporter */
export default function parse(element, { document }) {
  // Block header: must match exactly
  const headerRow = ['Columns (columns26)'];

  // The main two columns are .c-hero-header-key-callout__content-wrapper and .c-hero-header-key-callout__image-wrapper
  const grid = element.querySelector('.container-grid');
  if (!grid) return;
  const leftWrapper = grid.querySelector('.c-hero-header-key-callout__content-wrapper');
  const rightWrapper = grid.querySelector('.c-hero-header-key-callout__image-wrapper');

  // LEFT COLUMN: gather all relevant content inside .c-content-container__body
  let leftColumn = null;
  if (leftWrapper) {
    const contentBody = leftWrapper.querySelector('.c-content-container__body');
    if (contentBody) {
      // We'll reference the whole content body, as it contains heading, supporting copy, rates widget, and buttons
      leftColumn = contentBody;
    }
  }
  if (!leftColumn) {
    // fallback to empty div
    leftColumn = document.createElement('div');
  }

  // RIGHT COLUMN: extract image from style attribute
  let rightColumn = null;
  if (rightWrapper) {
    // Attempt to extract the largest image URL from style
    const style = rightWrapper.getAttribute('style') || '';
    let imageUrl = '';
    const large = style.match(/--image-large: url\('([^']+)'\)/);
    const medium = style.match(/--image-medium: url\('([^']+)'\)/);
    const small = style.match(/--image-small: url\('([^']+)'\)/);
    if (large) {
      imageUrl = large[1];
    } else if (medium) {
      imageUrl = medium[1];
    } else if (small) {
      imageUrl = small[1];
    }
    if (imageUrl) {
      const img = document.createElement('img');
      img.src = imageUrl;
      img.alt = '';
      rightColumn = img;
    } else {
      // fallback: blank div
      rightColumn = document.createElement('div');
    }
  } else {
    rightColumn = document.createElement('div');
  }

  // TABLE: header row, then content row with each column's content
  const cells = [
    headerRow,
    [leftColumn, rightColumn]
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
