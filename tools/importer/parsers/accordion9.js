/* global WebImporter */
export default function parse(element, { document }) {
  // Find the accordion block within the provided element
  const accordion = element.querySelector('.c-accordion');
  if (!accordion) return;

  // Prepare the table header row - exact match to example
  const headerRow = ['Accordion (accordion9)'];

  // Gather all accordion items
  const items = Array.from(accordion.querySelectorAll('.c-accordion__item'));

  // For each item, extract the title and content, referencing existing elements
  const rows = items.map(item => {
    // Title cell - use inner text of .item-title span if available, else button text
    const btn = item.querySelector('.c-accordion__header-button');
    let titleEl;
    if (btn) {
      const span = btn.querySelector('.item-title');
      if (span) {
        titleEl = span;
      } else {
        // fallback: wrap button text in a <div>
        titleEl = document.createElement('div');
        titleEl.textContent = btn.textContent.trim();
      }
    } else {
      // fallback: empty div
      titleEl = document.createElement('div');
    }

    // Content cell - reference the content details element if available
    let contentEl = item.querySelector('.c-accordion__content__details');
    if (!contentEl) {
      // fallback: get the main content area
      contentEl = item.querySelector('.c-accordion__content') || document.createElement('div');
    }
    // Both cells must reference existing elements, not clones or HTML strings
    return [titleEl, contentEl];
  });

  // Build the table array
  const cells = [headerRow, ...rows];

  // Create table using WebImporter.DOMUtils.createTable
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original accordion with block table
  accordion.parentNode.replaceChild(block, accordion);
}
