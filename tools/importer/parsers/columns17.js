/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract columns from a .columncontrol .grid block
  function extractColumns(gridBlock) {
    // Get all immediate children that look like columns
    const colEls = Array.from(gridBlock.children).filter(gc => gc.className && gc.className.match(/g-span/) && gc.textContent.trim() !== '');
    return colEls.map(gc => {
      // Prefer the deepest meaningful content container
      let content = gc.querySelector('.cmp-custom-columns__container .container .cmp-container');
      if (!content) content = gc.querySelector('.cmp-custom-columns__container');
      if (!content) content = gc;
      // Aggregate all non-empty direct children (usually <div>s or other blocks)
      let meaningfulChildren = Array.from(content.children).filter(e => e.textContent.trim() !== '');
      // If there are multiple meaningful children, return as array; else just the single child or content
      if (meaningfulChildren.length > 1) {
        return meaningfulChildren;
      } else if (meaningfulChildren.length === 1) {
        return meaningfulChildren[0];
      } else {
        return content;
      }
    });
  }

  // Find all .columncontrol .grid blocks (main content columns)
  const gridBlocks = Array.from(element.querySelectorAll('.columncontrol .grid'));

  let tableRows = [ ['Columns (columns17)'] ]; // Header row

  if (gridBlocks.length) {
    // For each columns block (should be one per major content section)
    gridBlocks.forEach(gridBlock => {
      const columns = extractColumns(gridBlock);
      if (columns.length) {
        tableRows.push(columns);
      }
    });
  } else {
    // Fallback: try to treat top-level as a single column
    tableRows.push([element]);
  }

  // Create and replace block
  const block = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(block);
}
