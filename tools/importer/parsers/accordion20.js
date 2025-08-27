/* global WebImporter */
export default function parse(element, { document }) {
  // Prepare the header row as specified
  const headerRow = ['Accordion (accordion20)'];
  const rows = [headerRow];

  // Locate the main accordion element (it can be nested)
  let accordion = element.querySelector('.c-accordion');
  if (!accordion) accordion = element.querySelector('[role="tablist"]');
  if (!accordion) return;

  // Select all direct accordion items
  const items = accordion.querySelectorAll(':scope > .c-accordion__item');
  items.forEach(item => {
    // Title cell: try to reference the .item-title span if possible
    let titleCell = '';
    const btnTitle = item.querySelector('.c-accordion__header-button .item-title');
    if (btnTitle) {
      titleCell = btnTitle.textContent.trim();
    } else {
      // Fallback to h3 or button text
      const h3 = item.querySelector('h3');
      if (h3 && h3.textContent) {
        titleCell = h3.textContent.trim();
      } else {
        const button = item.querySelector('button');
        if (button && button.textContent) {
          titleCell = button.textContent.trim();
        }
      }
    }

    // Content cell: include all of the .c-accordion__content__details block (preserving tables, lists, structure)
    let contentCell;
    const details = item.querySelector('.c-accordion__content__details');
    if (details) {
      contentCell = details;
    } else {
      // Fallback to the region or wrapper
      const contentRegion = item.querySelector('.c-accordion__content');
      if (contentRegion) {
        contentCell = contentRegion;
      } else {
        // Fallback: empty content
        contentCell = document.createElement('div');
      }
    }

    rows.push([titleCell, contentCell]);
  });

  // Replace the original element with the new table block
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
