/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the main content and image wrapper
  const contentWrapper = element.querySelector('.c-hero-header-key-callout__content-wrapper');
  const imageWrapper = element.querySelector('.c-hero-header-key-callout__image-wrapper');

  // Get the heading (h1) and supporting copy (p)
  let heading = null;
  let supportingCopy = null;
  if (contentWrapper) {
    const body = contentWrapper.querySelector('.c-content-container__body');
    if (body) {
      heading = body.querySelector('h1');
      const supporting = body.querySelector('.c-content-container__supporting-copy');
      if (supporting) {
        supportingCopy = supporting.querySelector('p');
      }
    }
  }

  // Get the image URL from the style attribute (prefer large, then medium, then small)
  let imageUrl = null;
  if (imageWrapper && imageWrapper.getAttribute('style')) {
    const style = imageWrapper.getAttribute('style');
    // Try to get large, then medium, then small
    const largeMatch = style.match(/--image-large: url\('([^']+)'\)/);
    const mediumMatch = style.match(/--image-medium: url\('([^']+)'\)/);
    const smallMatch = style.match(/--image-small: url\('([^']+)'\)/);
    imageUrl = largeMatch?.[1] || mediumMatch?.[1] || smallMatch?.[1] || null;
  }

  // Create an image element if we have a URL
  let imageEl = null;
  if (imageUrl) {
    imageEl = document.createElement('img');
    imageEl.src = imageUrl;
    imageEl.alt = heading ? heading.textContent.trim() : '';
  }

  // Compose the block table rows
  const cells = [];
  // Header row
  cells.push(['Hero']);
  // Image row
  cells.push([imageEl ? imageEl : '']);
  // Content row: heading and supporting copy
  const content = [];
  if (heading) content.push(heading);
  if (supportingCopy) content.push(supportingCopy);
  cells.push([content]);

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(block);
}
