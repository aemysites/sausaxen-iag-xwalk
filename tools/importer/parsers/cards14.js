/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the carousel wrapper
  const swiperWrapper = element.querySelector('.swiper-wrapper');
  if (!swiperWrapper) return;

  // Get all card slides
  const slides = Array.from(swiperWrapper.children).filter(slide => slide.classList.contains('swiper-slide'));

  // Table header row as per markdown example
  const headerRow = ['Cards'];
  const rows = [headerRow];

  slides.forEach((slide) => {
    // Each slide contains a card
    const card = slide.querySelector('.c-product-selector__card');
    if (!card) return;

    // Find image/icon for the first cell (mandatory)
    // This block does not have an image, but the motivator badge is visually distinct, so we use it as the icon
    const motivator = card.querySelector('.c-hl-motivator');
    let iconCell = '';
    if (motivator) {
      iconCell = motivator.cloneNode(true);
    }

    // Compose the card content for the second cell
    // We'll use all content except motivator
    const cardInnerDiv = card.querySelector('div');
    const cardContentEls = [];
    if (cardInnerDiv) {
      Array.from(cardInnerDiv.children).forEach(child => {
        if (!child.classList.contains('c-hl-motivator')) {
          cardContentEls.push(child.cloneNode(true));
        }
      });
    }
    const features = card.querySelector('.c-product-selector__card__features');
    if (features) cardContentEls.push(features.cloneNode(true));
    const repayments = card.querySelector('.c-product-selector__card__repayments');
    if (repayments) cardContentEls.push(repayments.cloneNode(true));

    const cellContent = document.createElement('div');
    cardContentEls.forEach(el => cellContent.appendChild(el));

    // Each row: [icon/image, text content]
    rows.push([iconCell, cellContent]);
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
