/* global WebImporter */
export default function parse(element, { document }) {
  // Prepare header row exactly matching the example
  const headerRow = ['Cards (cards28)'];
  // Get all immediate card containers (columns)
  const cardContainers = element.querySelectorAll(':scope > div');
  const rows = [headerRow];

  cardContainers.forEach((container) => {
    // First cell: Icon (mandatory)
    let iconCell = null;
    const iconWrapper = container.querySelector('.icon-wrapper');
    if (iconWrapper) {
      // get the first icon (i, svg, img)
      const iconEl = iconWrapper.querySelector('i, svg, img');
      iconCell = iconEl || iconWrapper;
    }
    // Second cell: Text content (mandatory)
    const contentCell = document.createElement('div');
    // Heading
    const heading = container.querySelector('.c-card--product__heading, h3, h4, h2, h1');
    if (heading) {
      contentCell.appendChild(heading);
    }
    // Description
    const desc = container.querySelector('.c-card--product__description, p');
    if (desc) {
      // If it's a wrapper, find the paragraph
      const para = desc.querySelector('p');
      if (para) {
        contentCell.appendChild(para);
      } else {
        contentCell.appendChild(desc);
      }
    }
    // Call-to-action link
    const ctaWrapper = container.querySelector('.c-button-wrapper-stack');
    if (ctaWrapper) {
      const link = ctaWrapper.querySelector('a');
      if (link) {
        contentCell.appendChild(link);
      }
    }
    // Fallback: if no icon, use null (ensures cell count is correct)
    rows.push([iconCell, contentCell]);
  });

  // Create the block table and replace original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
