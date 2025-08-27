/* global WebImporter */
export default function parse(element, { document }) {
  // Columns block header row
  const headerRow = ['Columns (columns16)'];

  // Find all columns: each .swiper-slide is a column, inside .swiper-wrapper in the carousel
  let slides = [];
  const wrapper = element.querySelector('.swiper-wrapper');
  if (wrapper) {
    slides = Array.from(wrapper.children).filter(child => child.classList.contains('swiper-slide'));
  } else {
    // Fallback: just in case, select all .swiper-slide descendants
    slides = Array.from(element.querySelectorAll('.swiper-slide'));
  }

  // Each slide content: take the main product card block inside the slide
  // Reference the existing element, not cloning or creating new elements
  const contentRow = slides.map(slide => {
    // The main card inside a slide
    const card = slide.querySelector('.c-product-selector__card');
    // If found, use it, else fallback to the slide itself (should never happen for this HTML)
    return card || slide;
  });

  // Table format: [ [header], [col1, col2, ...] ]
  const cells = [headerRow, contentRow];

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
