/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main card wrapper
  const cardWrapper = element.querySelector('.c-benefits');
  if (!cardWrapper) return;

  // Find all card items
  const cardItems = cardWrapper.querySelectorAll('.c-benefits__item');
  if (!cardItems.length) return;

  // Table header row as per example
  const headerRow = ['Cards'];

  // Build rows for each card (2 columns: first cell for image/icon, second cell for text)
  // This block has no images, so use the 'no images' variant: only one cell per row, but header stays the same
  const rows = Array.from(cardItems).map((card) => {
    const caption = card.querySelector('.c-caption-wrapper');
    if (!caption) return [''];
    const heading = caption.querySelector('h2, h3');
    const description = caption.querySelector('p');
    const ctaWrapper = caption.querySelector('.c-button-wrapper');
    const ctaLink = ctaWrapper ? ctaWrapper.querySelector('a') : null;
    const cellContent = [];
    if (heading) cellContent.push(heading);
    if (description) cellContent.push(description);
    if (ctaLink) cellContent.push(ctaLink);
    return [[], cellContent];
  });

  // Compose the table data
  const tableData = [headerRow, ...rows];

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the block table
  element.replaceWith(blockTable);
}
