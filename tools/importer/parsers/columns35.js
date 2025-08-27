/* global WebImporter */
export default function parse(element, { document }) {
  // Header row: must match the block name exactly
  const headerRow = ['Columns (columns35)'];

  // 1. Find main calculator wrapper for the columns block
  const calculatorWrapper = element.querySelector('.c-flexible-wrapper.c-repayment-calculator');
  if (!calculatorWrapper) return;

  // 2. Find the main container within the calculator block
  const container = calculatorWrapper.querySelector('.container');
  if (!container) return;

  // Left column: All intro and calculator form content
  const leftColumnContent = [];
  // a. Intro section (with headings and explanatory text)
  const introContent = container.querySelector('.c-repayment-calculator__content');
  if (introContent) leftColumnContent.push(introContent);
  // b. Calculator form and sticky banner
  const calculatorForm = container.querySelector('.c-repayment-calculator__container');
  if (calculatorForm) {
    leftColumnContent.push(calculatorForm);
  }

  // Right column: Results (if present and meaningful)
  let rightColumnContent = null;
  if (calculatorForm) {
    const resultsPanel = calculatorForm.querySelector('.c-repayment-calculator__results');
    // Only include if there's at least some visual content
    if (resultsPanel) {
      rightColumnContent = resultsPanel;
    }
  }

  // Compose cells array: two columns for the layout
  const cells = [
    headerRow,
    [leftColumnContent, rightColumnContent]
  ];

  // Create table block using provided helper
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(block);
}
