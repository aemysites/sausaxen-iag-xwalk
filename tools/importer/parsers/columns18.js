/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Build the header row exactly as required
  const headerRow = ['Columns (columns18)'];

  // 2. Find all column containers - these should correspond to each column visually
  // The columns are .g-span-lg-3 inside the .grid
  let grid = element.querySelector('.cmp-custom-columns .grid');
  let columns = [];
  if (grid) {
    columns = Array.from(grid.querySelectorAll(':scope > div.g-span-lg-3'));
  }

  // Defensive fallback in case the grid structure is missing or altered
  if (columns.length === 0) {
    columns = Array.from(element.querySelectorAll(':scope > div.g-span-lg-3'));
  }

  // 3. For each column, extract the main content block
  // We reference the deepest content area, not clone or create new ones
  const columnCells = columns.map((col) => {
    // Each column contains .cmp-custom-columns__container
    const colContainer = col.querySelector('.cmp-custom-columns__container');
    if (!colContainer) return col;

    // Each container then contains a .container.responsivegrid or .cmp-container
    let contentBlock = colContainer.querySelector('.container.responsivegrid, .cmp-container');
    if (contentBlock) {
      // The actual content is often in its top level child <div>
      let directContent = contentBlock.querySelector(':scope > div');
      if (directContent) {
        return directContent;
      }
      return contentBlock;
    }
    return colContainer;
  });

  // 4. There are 4 columns in this block, but sometimes the rightmost column may be outside the .grid
  // So if we have less than 4, look for another column at the end
  if (columnCells.length < 4) {
    // Try to find any .g-span-lg-3 or .cmp-custom-columns__container that's not in the grid
    const extraCol = element.querySelector(':scope > div.cmp-custom-columns__container:last-child');
    if (extraCol) {
      let contentBlock = extraCol.querySelector('.container.responsivegrid, .cmp-container');
      if (contentBlock) {
        let directContent = contentBlock.querySelector(':scope > div');
        if (directContent) {
          columnCells.push(directContent);
        } else {
          columnCells.push(contentBlock);
        }
      } else {
        columnCells.push(extraCol);
      }
    }
  }

  // Ensure we only have up to 4 columns (for this design)
  if (columnCells.length > 4) {
    columnCells.length = 4;
  }

  // 5. Assemble table rows: header, then the columns
  const rows = [headerRow, columnCells];

  // 6. Create the block table with existing referenced elements
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // 7. Replace the original element
  element.replaceWith(block);
}
