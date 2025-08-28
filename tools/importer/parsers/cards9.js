/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main cards wrapper
  const cardsWrapper = element.querySelector('.c-cross-link-tile-group');
  if (!cardsWrapper) return;

  // Find all card columns
  const cardCols = cardsWrapper.querySelectorAll('.row.u-flex-wrapper > .col-md-6.u-flex');
  if (!cardCols.length) return;

  // Prepare the table rows
  const rows = [];
  // Use the correct header for no images
  rows.push(['Cards (no images)']);

  // For each card column, extract content
  cardCols.forEach((col) => {
    const cardInner = col.querySelector('.c-card__inner');
    if (!cardInner) return;

    // Get the content area (title/description)
    const content = cardInner.querySelector('.c-card__content');
    // Get the button wrapper (CTAs)
    const ctaWrapper = cardInner.querySelector('.c-button-wrapper-stack');

    // Compose the text cell
    const cellContent = [];
    if (content) {
      const heading = content.querySelector('h2, h3, h4, h5, h6');
      if (heading) cellContent.push(heading);
      content.childNodes.forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE && !/^H[2-6]$/.test(node.tagName)) {
          cellContent.push(node);
        }
      });
    }
    if (ctaWrapper) {
      ctaWrapper.querySelectorAll('a, button').forEach((cta) => {
        cellContent.push(cta);
      });
    }

    // For 'no images' variant, two columns: first cell empty, second cell is text content
    rows.push([[], cellContent]);
  });

  // Create the table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(table);
}
