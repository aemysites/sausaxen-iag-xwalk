/* global WebImporter */
export default function parse(element, { document }) {
  // Block header row
  const headerRow = ['Cards (cardsNoImages7)'];
  // Locate all card blocks in this section
  const cardRows = [];
  // Get all direct card container columns
  const row = element.querySelector('.row.u-flex-wrapper');
  if (row) {
    const cardCols = row.querySelectorAll(':scope > div.col-md-6.u-flex');
    cardCols.forEach(col => {
      // Each col contains one card
      const card = col.querySelector('.c-card');
      if (card) {
        const inner = card.querySelector('.c-card__inner');
        let cardContent = [];
        // Heading (if any)
        const heading = inner.querySelector('.c-card__content > h2, .c-card__content > h3, .c-card__content > h4, .c-card__content > h1');
        if (heading) {
          cardContent.push(heading);
        }
        // Description: if any present, e.g. <p> in content (none here, but resilient)
        const descs = inner.querySelectorAll('.c-card__content > p');
        descs.forEach(desc => cardContent.push(desc));
        // CTAs: all <a> inside .c-button-wrapper-stack
        const ctaWrapper = inner.querySelector('.c-button-wrapper-stack');
        if (ctaWrapper) {
          const ctas = Array.from(ctaWrapper.querySelectorAll('a'));
          if (ctas.length) {
            // If >1 CTA, wrap in a div to preserve grouping
            if (ctas.length > 1) {
              const ctaDiv = document.createElement('div');
              ctas.forEach(a => ctaDiv.appendChild(a));
              cardContent.push(ctaDiv);
            } else {
              cardContent.push(ctas[0]);
            }
          }
        }
        // If only one piece (heading or CTA), just use the element. If multiple, use array to preserve order.
        if (cardContent.length === 1) {
          cardRows.push([cardContent[0]]);
        } else {
          cardRows.push([cardContent]);
        }
      }
    });
  }
  // Compose table: header row + one row per card
  const rows = [headerRow, ...cardRows];
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
