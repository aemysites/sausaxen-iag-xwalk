/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: check for main calculator container
  if (!element) return;

  // Get the two main columns: left is the form, right is the results
  // The structure is:
  // <div id="repayment-calculator-...">
  //   <div class="c-repayment-calculator__form">...</div>
  //   <div class="c-repayment-calculator__results">...</div>
  // </div>

  const columns = Array.from(element.querySelectorAll(':scope > div'));
  // Defensive: ensure we have at least two columns
  if (columns.length < 2) return;
  const formCol = columns[0];
  const resultsCol = columns[1];

  // Table header as per block guidelines
  const headerRow = ['Columns (columns32)'];
  // Second row: two columns side by side
  const contentRow = [formCol, resultsCol];

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  element.replaceWith(table);
}
