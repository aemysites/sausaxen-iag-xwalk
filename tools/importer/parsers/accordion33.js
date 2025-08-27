/* global WebImporter */
export default function parse(element, { document }) {
  // Prepare the header row exactly as required
  const headerRow = ['Accordion (accordion33)'];

  // Get all immediate accordion items
  const accordionItems = element.querySelectorAll(':scope > .c-accordion__item');
  const rows = [headerRow];

  accordionItems.forEach(item => {
    // Title cell: the accordion item title (the button span content)
    let titleSpan = item.querySelector('.c-accordion__header-button .item-title');
    let title = titleSpan ? titleSpan : document.createTextNode('');

    // Content cell: the accordion item content (the .c-accordion__content__details block)
    let content = item.querySelector('.c-accordion__content__details');
    let contentCell = content ? content : document.createTextNode('');

    rows.push([title, contentCell]);
  });

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element in the DOM
  element.replaceWith(table);
}
