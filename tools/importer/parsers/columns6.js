/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Block header
  const headerRow = ['Columns (columns6)'];

  // 2. Find the relevant columns (col-lg-4, col-lg-8)
  const container = element.querySelector('.container');
  if (!container) return;
  const mainRow = container.querySelector('.row');
  if (!mainRow) return;
  const columns = mainRow.querySelectorAll(':scope > [class*="col-lg"]');
  if (columns.length < 2) return; // expects at least 2 columns

  // ---- COLUMN 1 ----
  const col1 = columns[0];
  // Gather heading, description, CTA
  const col1Content = [];
  const heading = col1.querySelector('h2');
  if (heading) col1Content.push(heading);
  const desc = col1.querySelector('.c-how-it-works__header-content p');
  if (desc) col1Content.push(desc);
  const cta = col1.querySelector('.c-how-it-works__header-cta a');
  if (cta) col1Content.push(cta);

  // ---- COLUMN 2 ----
  const col2 = columns[1];
  // This column contains a row > 2 col-md-6's, each with p > a
  const columnsContent = [];
  const innerRow = col2.querySelector('.row');
  if (innerRow) {
    const innerCols = innerRow.querySelectorAll(':scope > .col-md-6');
    innerCols.forEach((ic) => {
      // Each ic contains several <p> with <a>
      ic.querySelectorAll('p').forEach((p) => {
        // Each <a> may contain an <i> icon, keep the <a> element
        const link = p.querySelector('a');
        if (link) columnsContent.push(link);
      });
    });
  }

  // In columns blocks, if there are only two main columns, each cell is a column
  const contentRow = [col1Content, columnsContent];

  // 3. Build table
  const table = WebImporter.DOMUtils.createTable([headerRow, contentRow], document);

  // 4. Replace element
  element.replaceWith(table);
}