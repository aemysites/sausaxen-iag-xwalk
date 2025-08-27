/* global WebImporter */
export default function parse(element, { document }) {
  // Find the actual columns container
  const wrapper = element.querySelector('.c-flexible-wrapper');
  if (!wrapper) return;
  const container = wrapper.querySelector('.container');
  if (!container) return;
  const title = container.querySelector('h2');

  // Find the columns block
  const iconsItems = container.querySelector('.c-cvp-icons__items');
  if (!iconsItems) return;
  const iconItems = Array.from(iconsItems.children);

  // Gather each column's content as an element
  const columnsContent = iconItems.map((iconItem) => {
    // Use a wrapper div to preserve layout
    const colDiv = document.createElement('div');
    // Include the img icon
    const img = iconItem.querySelector('img');
    if (img) colDiv.appendChild(img);
    // Include the content (usually a p, may contain a sup/disclaimer)
    const content = iconItem.querySelector('.c-cvp-icon-item__content');
    if (content) {
      Array.from(content.childNodes).forEach(node => colDiv.appendChild(node));
    }
    return colDiv;
  });

  // Compose the table cells: header row, title row, columns row
  const cells = [
    ['Columns (columns24)'],
  ];

  // Title row (if present)
  if (title) {
    cells.push([title]);
  }

  // Columns row (all columns side by side)
  cells.push(columnsContent);

  // Create the columns block table
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
