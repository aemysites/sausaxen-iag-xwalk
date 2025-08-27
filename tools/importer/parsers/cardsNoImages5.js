/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as specified
  const headerRow = ['Cards (cardsNoImages5)'];

  // Select all card columns (each is a card block)
  const cardContainers = element.querySelectorAll(':scope > div.u-flex.c-card__container--product');
  const rows = [];

  cardContainers.forEach(card => {
    const cardContent = card.querySelector('.c-card--product__content');
    if (!cardContent) {
      // If the structure is missing, skip this card
      return;
    }
    // Find heading (h3) and description (div with class c-card--product__description)
    const heading = cardContent.querySelector('h3');
    const description = cardContent.querySelector('.c-card--product__description');

    // Prepare the cell content in order: heading, then description (if present)
    const cellContent = [];
    if (heading) cellContent.push(heading);
    if (description) cellContent.push(description);
    // Only add if there is some content
    if (cellContent.length > 0) {
      rows.push([cellContent]);
    }
  });

  // Compose the final table of block cells
  const cells = [headerRow, ...rows];
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(blockTable);
}
