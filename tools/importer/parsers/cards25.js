/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: get all immediate card containers
  const cardContainers = Array.from(element.querySelectorAll(':scope > .col-md-6, :scope > .col-md-6.col-xl-4'));

  // Table header as per example markdown (must be exactly one column)
  const headerRow = ['Cards'];

  // Build table rows for each card
  const rows = cardContainers.map(cardContainer => {
    // Find the card content
    const card = cardContainer.querySelector('.c-card--product');
    if (!card) return null;

    // --- Icon cell ---
    // Find the icon element (could be <i> or similar)
    let iconCell = null;
    const iconWrapper = card.querySelector('.icon-wrapper');
    if (iconWrapper) {
      // Use the icon wrapper directly for resilience
      iconCell = iconWrapper;
    }

    // --- Text cell ---
    const textCellContent = [];

    // Heading
    const heading = card.querySelector('.c-card--product__heading');
    if (heading) textCellContent.push(heading);

    // Description
    const description = card.querySelector('.c-card--product__description');
    if (description) textCellContent.push(description);

    // CTA button
    const buttonWrapper = card.querySelector('.c-button-wrapper-stack');
    if (buttonWrapper) {
      const link = buttonWrapper.querySelector('a');
      if (link) textCellContent.push(link);
    }

    return [iconCell, textCellContent];
  }).filter(Boolean); // Remove any nulls if parsing failed

  // Compose table data
  const cells = [headerRow, ...rows];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Fix: Ensure the header row is a single column (remove any extra th if present)
  const theadRow = block.querySelector('thead tr');
  if (theadRow && theadRow.children.length > 1) {
    while (theadRow.children.length > 1) {
      theadRow.removeChild(theadRow.lastChild);
    }
  }

  // Replace the original element with the block table
  element.replaceWith(block);
}
