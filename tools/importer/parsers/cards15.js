/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the cards container
  const cardsContainer = element.querySelector('.c-even-columns__components');
  if (!cardsContainer) return;

  // Get all card wrappers (each card)
  const cardEls = Array.from(cardsContainer.children);

  // Prepare the header row as per example
  const headerRow = ['Cards'];

  // Prepare rows for each card
  const rows = cardEls.map((cardEl) => {
    // Defensive: Find the card content
    const cardContent = cardEl.querySelector('.c-card--product');
    if (!cardContent) return null;

    // --- Icon cell ---
    // Find the icon wrapper
    let iconCell = null;
    const iconWrapper = cardContent.querySelector('.icon-wrapper');
    if (iconWrapper) {
      // Use the <i> element directly
      const icon = iconWrapper.querySelector('i');
      if (icon) {
        iconCell = icon;
      }
    }
    // Fallback: If no icon, leave cell empty
    if (!iconCell) iconCell = document.createElement('span');

    // --- Text cell ---
    const textCellContent = [];
    // Heading
    const heading = cardContent.querySelector('.c-card--product__heading');
    if (heading) textCellContent.push(heading);
    // Description
    const desc = cardContent.querySelector('.c-card--product__description');
    if (desc) textCellContent.push(desc);
    // CTA button
    const ctaWrapper = cardContent.querySelector('.c-button-wrapper-stack');
    if (ctaWrapper) {
      const cta = ctaWrapper.querySelector('a');
      if (cta) textCellContent.push(cta);
    }

    return [iconCell, textCellContent];
  }).filter(Boolean);

  // Compose table data
  const tableData = [headerRow, ...rows];

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the block table
  element.replaceWith(blockTable);
}
