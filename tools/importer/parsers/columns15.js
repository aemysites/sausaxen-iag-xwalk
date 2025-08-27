/* global WebImporter */
export default function parse(element, { document }) {
  // Ensure we are inside the correct structure
  const container = element.querySelector('.cmp-header__container');
  if (!container) return;

  // Get all major column sections
  // Column 1: Logo
  const logoSection = container.querySelector('.cmp-header__logo-section');

  // Column 2: Navigation
  const navigationSection = container.querySelector('.cmp-header__navigation-section');

  // Column 3: User info + Search (combine)
  // Collect all direct children that are part of this column
  const rightColumnContent = [];
  const userInfoSection = container.querySelector('.cmp-header__user-info-section');
  if (userInfoSection && userInfoSection.childNodes.length > 0) {
    rightColumnContent.push(userInfoSection);
  }
  const searchSection = container.querySelector('.cmp-header__search-section');
  if (searchSection && searchSection.childNodes.length > 0) {
    rightColumnContent.push(searchSection);
  }
  const searchBtnWrapper = container.querySelector('.cmp-header__search-button-wrapper');
  if (searchBtnWrapper && searchBtnWrapper.childNodes.length > 0) {
    rightColumnContent.push(searchBtnWrapper);
  }

  // Guard against all columns being empty
  if (!logoSection && !navigationSection && rightColumnContent.length === 0) return;

  // Header row must be exactly 'Columns (columns15)'
  const headerRow = ['Columns (columns15)'];
  // Second row is the columns. Each cell can be an element or an array of elements.
  const columnsRow = [
    logoSection ? logoSection : '',
    navigationSection ? navigationSection : '',
    rightColumnContent.length ? rightColumnContent : ''
  ];

  // Build the table block
  const block = WebImporter.DOMUtils.createTable([
    headerRow,
    columnsRow
  ], document);

  // Replace original element with block table
  element.replaceWith(block);
}
