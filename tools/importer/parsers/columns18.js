/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: get all immediate children (each column)
  const items = Array.from(element.querySelectorAll(':scope > .c-cvp-icon-item'));
  const headerRow = ['Columns (columns18)'];
  // Build the columns row
  const columnsRow = items.map((item) => {
    // Get the image (should be the first child)
    const img = item.querySelector('img');
    // Get the content (should be the .c-cvp-icon-item__content div)
    const contentDiv = item.querySelector('.c-cvp-icon-item__content');
    // Defensive: create a wrapper div for both image and content
    const cellDiv = document.createElement('div');
    if (img) cellDiv.appendChild(img);
    if (contentDiv) {
      // Move all children of contentDiv into cellDiv
      Array.from(contentDiv.childNodes).forEach((node) => {
        cellDiv.appendChild(node);
      });
    }
    return cellDiv;
  });
  const cells = [headerRow, columnsRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
