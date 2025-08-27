/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the main two-column content wrapper
  let wrapper = element.querySelector('.c-flexible-wrapper');
  if (!wrapper) wrapper = element;
  const row = wrapper.querySelector('.row');
  if (!row) return;
  const columns = row.querySelectorAll(':scope > div');

  // Defensive: Identify image and text columns by class
  let imageCellContent = null;
  let textCellContent = null;

  const imageCol = Array.from(columns).find(col => col.classList.contains('c-two-col-generic__image-wrapper'));
  if (imageCol) {
    // Extract background-image URL
    const bgUrlMatch = imageCol.style.backgroundImage && imageCol.style.backgroundImage.match(/url\("(.*?)"\)/);
    if (bgUrlMatch && bgUrlMatch[1]) {
      // Create <img> referencing background-image
      const img = document.createElement('img');
      img.src = bgUrlMatch[1];
      img.alt = '';
      imageCellContent = img;
    } else {
      // If no background image, but children exist (edge case)
      if (imageCol.children.length > 0) {
        imageCellContent = imageCol;
      } else {
        imageCellContent = document.createTextNode('');
      }
    }
  } else {
    imageCellContent = document.createTextNode('');
  }

  const textCol = Array.from(columns).find(col => col.classList.contains('c-two-col-generic__text-wrapper'));
  if (textCol) {
    // The card may contain content and button wrapper
    const card = textCol.querySelector('.c-card');
    if (card) {
      const cardContent = card.querySelector('.c-card__content');
      const buttonWrapper = card.querySelector('.c-button-wrapper');
      // Combine both into one container
      const cellDiv = document.createElement('div');
      if (cardContent) cellDiv.appendChild(cardContent);
      if (buttonWrapper) cellDiv.appendChild(buttonWrapper);
      textCellContent = cellDiv;
    } else {
      // In case structure changes, fallback to whole textCol
      textCellContent = textCol;
    }
  } else {
    textCellContent = document.createTextNode('');
  }

  // Table header: must exactly match the example
  const headerRow = ['Columns (columns3)'];
  // Table second row with two columns
  const cells = [
    headerRow,
    [imageCellContent, textCellContent]
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
