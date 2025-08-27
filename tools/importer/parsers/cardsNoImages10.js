/* global WebImporter */
export default function parse(element, { document }) {
  // Find the section containing the cards
  const cardsSection = element.querySelector('.c-benefits');
  if (!cardsSection) return;
  const container = cardsSection.querySelector('.container');
  if (!container) return;

  // Select all card items
  const cardItems = Array.from(container.querySelectorAll('.c-benefits__item'));
  const rows = [];

  // Table header must match the component name exactly
  rows.push(['Cards (cardsNoImages10)']);

  // For each card, assemble its content
  cardItems.forEach(cardItem => {
    const caption = cardItem.querySelector('.c-caption-wrapper');
    const cellContents = [];

    if (caption) {
      // Heading (can be h2 or h3)
      const heading = caption.querySelector('h2, h3');
      if (heading) cellContents.push(heading);
      // Description (first <p>)
      const description = caption.querySelector('p');
      if (description) cellContents.push(description);
      // CTA link (inside .c-button-wrapper > a)
      const ctaWrapper = caption.querySelector('.c-button-wrapper');
      if (ctaWrapper) {
        const link = ctaWrapper.querySelector('a');
        if (link) cellContents.push(link);
      }
    }
    // Add this card row (always one column)
    rows.push([cellContents]);
  });

  // Create the block table and replace the original element
  const blockTable = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(blockTable);
}
