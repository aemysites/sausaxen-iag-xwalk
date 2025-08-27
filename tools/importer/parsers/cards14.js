/* global WebImporter */
export default function parse(element, { document }) {
  // Prepare table header row as specified
  const rows = [['Cards (cards14)']];

  // Select all card containers inside the block
  const cardNodes = element.querySelectorAll('.c-card__container--product');

  cardNodes.forEach(cardNode => {
    // LEFT CELL: Icon (mandatory)
    // Prefer the .icon-wrapper if present
    let iconCell = null;
    const iconWrapper = cardNode.querySelector('.icon-wrapper');
    if (iconWrapper) {
      iconCell = iconWrapper;
    } else {
      // fallback: use the <i> element if icon-wrapper missing
      const iEl = cardNode.querySelector('i[class*="fa-"]');
      if (iEl) iconCell = iEl;
    }

    // RIGHT CELL: text content (heading + description + CTA)
    const rightCellContent = [];

    // Heading (optional)
    const heading = cardNode.querySelector('.c-card--product__heading, h3, h4, h2, h1');
    if (heading) rightCellContent.push(heading);

    // Description (optional)
    const desc = cardNode.querySelector('.c-card--product__description');
    if (desc) rightCellContent.push(desc);

    // CTA (optional)
    const cta = cardNode.querySelector('.c-button-wrapper-stack');
    if (cta) rightCellContent.push(cta);

    // Add the row: [icon, rest of content]
    rows.push([
      iconCell,
      rightCellContent
    ]);
  });

  // Replace the original element with the new block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
