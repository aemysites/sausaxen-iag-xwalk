/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for Accordion (accordion31)
  const headerRow = ['Accordion (accordion31)'];
  const rows = [headerRow];

  // Find all accordion items (immediate children)
  const items = element.querySelectorAll(':scope > .c-accordion__item');

  items.forEach((item) => {
    // TITLE: Find title element inside button inside h3
    let titleElem = null;
    const headerBtn = item.querySelector('.c-accordion__header-button');
    if (headerBtn) {
      // Prefer the .item-title span if present
      const itemTitle = headerBtn.querySelector('.item-title');
      if (itemTitle) {
        titleElem = itemTitle;
      } else {
        // Fallback: use the button itself (preserving HTML structure/formatting)
        titleElem = headerBtn;
      }
    } else {
      // Fallback: try to find h3 directly
      const h3 = item.querySelector('h3');
      if (h3) {
        titleElem = h3;
      } else {
        // As last resort, use empty node
        titleElem = document.createTextNode('');
      }
    }

    // CONTENT: Find content details
    let contentElem = null;
    // The .c-accordion__content__details contains all relevant content per accordion item
    const details = item.querySelector('.c-accordion__content__details');
    if (details) {
      contentElem = details;
    } else {
      // Fallback: .c-accordion__content
      const content = item.querySelector('.c-accordion__content');
      if (content) {
        contentElem = content;
      } else {
        // Fallback: .c-accordion__content-wrapper
        const wrapper = item.querySelector('.c-accordion__content-wrapper');
        if (wrapper) {
          contentElem = wrapper;
        } else {
          // As last resort, empty node
          contentElem = document.createTextNode('');
        }
      }
    }

    // Add the row for this accordion item
    rows.push([titleElem, contentElem]);
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element with the block
  element.replaceWith(block);
}
