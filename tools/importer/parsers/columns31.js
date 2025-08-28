/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the main two-col block
  const twoCol = element.querySelector('.c-two-col-generic');
  if (!twoCol) return;

  // Find the immediate column wrappers
  const row = twoCol.querySelector('.row.u-flex-wrapper, .row.no-gutters.u-flex-wrapper, .row.no-gutters');
  if (!row) return;
  const cols = Array.from(row.children).filter(child => child.classList.contains('col-sm-6') || child.classList.contains('col-sm-5') || child.classList.contains('col-sm-7'));
  if (cols.length < 2) return;

  // Identify which is image and which is text
  let imageCol, textCol;
  if (cols[0].className.includes('image-wrapper')) {
    imageCol = cols[0];
    textCol = cols[1];
  } else {
    textCol = cols[0];
    imageCol = cols[1];
  }

  // --- IMAGE COLUMN ---
  // Try to extract the background image URL
  let imgEl = null;
  const bgStyle = imageCol.style && imageCol.style.backgroundImage;
  if (bgStyle) {
    // background-image: url("...")
    const urlMatch = bgStyle.match(/url\(["']?(.*?)["']?\)/);
    if (urlMatch && urlMatch[1]) {
      imgEl = document.createElement('img');
      imgEl.src = urlMatch[1];
      imgEl.alt = '';
    }
  }

  // --- TEXT COLUMN ---
  // Find the card content
  let textContent = textCol.querySelector('.c-card__content') || textCol;

  // --- TABLE CONSTRUCTION ---
  const headerRow = ['Columns (columns31)'];
  const contentRow = [
    // Left: text, Right: image
    [textContent, imgEl].filter(Boolean),
  ];

  // If image is on the left, swap order
  if (imageCol === cols[0]) {
    contentRow[0].reverse();
  }

  // Split into two columns
  const tableRows = [
    headerRow,
    contentRow[0],
  ];

  const table = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(table);
}
