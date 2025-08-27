/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Create the header row exactly as described (block name)
  const headerRow = ['Hero'];

  // 2. Background image row (empty as there is no image in this block)
  const backgroundRow = [''];

  // 3. Extract the content for the third row: header and subheading/paragraph, etc.
  // Find the free-text content container for headline and copy
  let content = element.querySelector('.c-free-text__content');

  // If not found, fallback to first heading/paragraph directly inside element
  if (!content) content = element;

  // Find possible headings (h1-h6), paragraphs, and cta links
  const textElements = [];
  // Get all direct children that are heading or paragraph
  // This will maintain their order and semantic meaning
  Array.from(content.children).forEach(child => {
    if (/^H[1-6]$/i.test(child.tagName) || child.tagName === 'P') {
      textElements.push(child);
    }
  });

  // If nothing found, try querySelectorAll
  if (textElements.length === 0) {
    const possible = content.querySelectorAll('h1, h2, h3, h4, h5, h6, p');
    possible.forEach(el => textElements.push(el));
  }

  // The third row contains all found text elements as an array, or empty string if none
  const thirdRow = [textElements.length > 0 ? textElements : ['']];

  // Compose the block table
  const cells = [
    headerRow,
    backgroundRow,
    thirdRow
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element reference with the block table
  element.replaceWith(table);
}
