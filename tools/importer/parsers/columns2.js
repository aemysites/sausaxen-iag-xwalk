/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the main two column wrapper
  const twoCol = element.querySelector('.c-two-col-generic');
  if (!twoCol) return;

  // Find the immediate column wrappers
  const colDivs = twoCol.querySelectorAll('.row > div');
  if (colDivs.length < 2) return;

  // --- COLUMN 1: IMAGE ---
  const imageWrapper = colDivs[0];
  // Try to extract the background image URL
  let imgEl = null;
  const bgStyle = imageWrapper.getAttribute('style') || '';
  const urlMatch = bgStyle.match(/background-image:\s*url\(["']?([^"')]+)["']?\)/);
  if (urlMatch && urlMatch[1]) {
    imgEl = document.createElement('img');
    imgEl.src = urlMatch[1];
    imgEl.alt = '';
  }

  // --- COLUMN 2: TEXT ---
  const textWrapper = colDivs[1];
  // The card content (title, description, steps)
  const cardContent = textWrapper.querySelector('.c-card__content');
  // The button wrapper (actions)
  const buttonWrapper = textWrapper.querySelector('.c-button-wrapper');

  // Compose the text column content
  const textColumnContent = [];
  if (cardContent) textColumnContent.push(cardContent);
  if (buttonWrapper) textColumnContent.push(buttonWrapper);

  // --- TABLE STRUCTURE ---
  const headerRow = ['Columns (columns2)'];
  const contentRow = [imgEl, textColumnContent];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace the original element
  element.replaceWith(table);
}
