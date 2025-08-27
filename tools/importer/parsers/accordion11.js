/* global WebImporter */
export default function parse(element, { document }) {
  // Table header exactly as specified
  const headerRow = ['Accordion (accordion11)'];

  // Helper function to extract each accordion item into [title, content] cells
  function getAccordionRows(container) {
    const rows = [];
    // Select all immediate children that are .c-accordion__item
    const items = container.querySelectorAll(':scope > .c-accordion__item');
    items.forEach((item) => {
      // Title: Use the button with .c-accordion__header-button, but only the .item-title span inside (for semantic clarity)
      let titleSpan = item.querySelector('.c-accordion__header-button .item-title');
      let titleCell = titleSpan ? titleSpan : document.createElement('span');
      if (!titleSpan) {
        // fallback: use first h3's text or button's text if .item-title missing
        const h3 = item.querySelector('h3');
        if (h3) {
          titleCell.textContent = h3.textContent.trim();
        } else {
          titleCell.textContent = item.textContent.trim();
        }
      }

      // Content: Use .c-accordion__content__details if present, else .c-accordion__content
      let contentCell = null;
      let details = item.querySelector('.c-accordion__content__details');
      if (details) {
        contentCell = details;
      } else {
        // If no details, get content wrapper
        let content = item.querySelector('.c-accordion__content');
        if (content) {
          contentCell = content;
        } else {
          // fallback: empty div
          contentCell = document.createElement('div');
        }
      }
      rows.push([titleCell, contentCell]);
    });
    return rows;
  }

  // Assemble the block table
  const cells = [headerRow, ...getAccordionRows(element)];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
