/* global WebImporter */
export default function parse(element, { document }) {
  // Find the two main columns (one image, one text)
  const row = element.querySelector('.container .row');
  if (!row) return;

  // Get the two direct-section columns (order may vary)
  const cols = row.querySelectorAll(':scope > div');
  let textCol = null;
  let imageCol = null;
  cols.forEach(col => {
    if (col.classList.contains('c-two-col-generic__text-wrapper')) {
      textCol = col;
    } else if (col.classList.contains('c-two-col-generic__image-wrapper')) {
      imageCol = col;
    }
  });

  // Extract the content for the left column (text)
  let leftContent = [];
  if (textCol) {
    const cardContent = textCol.querySelector('.c-card__content');
    if (cardContent) {
      leftContent.push(cardContent);
    }
  }

  // Extract the content for the right column (image)
  let rightContent = [];
  if (imageCol) {
    // Extract background-image URL
    const bg = imageCol.style.backgroundImage;
    if (bg && bg.startsWith('url(')) {
      const url = bg.slice(4, -1).replace(/"/g, '');
      const img = document.createElement('img');
      img.src = url;
      img.alt = '';
      rightContent.push(img);
    }
  }

  // Build table structure
  const headerRow = ['Columns (columns34)'];
  const dataRow = [leftContent, rightContent];
  const table = WebImporter.DOMUtils.createTable([headerRow, dataRow], document);
  element.replaceWith(table);
}
