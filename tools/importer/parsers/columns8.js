/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Locate main internal content wrapper
  const container = element.querySelector('.container');
  if (!container) return;
  // 2. Find row with columns
  const row = container.querySelector('.row');
  if (!row) return;
  const cols = row.querySelectorAll(':scope > div');
  if (cols.length < 2) return;

  // 3. Column 1: Image as <img> referencing background-image
  let imageEl = null;
  const imageWrapper = cols[0];
  if (imageWrapper && imageWrapper.style && imageWrapper.style.backgroundImage) {
    const bgMatch = imageWrapper.style.backgroundImage.match(/url\(["']?(.*?)["']?\)/);
    if (bgMatch && bgMatch[1]) {
      imageEl = document.createElement('img');
      imageEl.src = bgMatch[1];
      imageEl.alt = '';
    }
  }

  // 4. Column 2: All text content block
  const textWrapper = cols[1];
  let contentEl = null;
  if (textWrapper) {
    // Reference the c-card__content if exists, otherwise the full wrapper
    const cardContent = textWrapper.querySelector('.c-card__content');
    contentEl = cardContent || textWrapper;
  }

  // 5. Build table structure: header and two columns in second row
  const cells = [
    ['Columns (columns8)'],
    [imageEl, contentEl]
  ];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
