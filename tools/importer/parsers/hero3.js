/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: get immediate child by class
  function getChildByClass(parent, className) {
    return Array.from(parent.children).find((el) => el.classList.contains(className));
  }

  // 1. Get the image (background asset)
  let imageEl = null;
  const cmpHerobanner = element.querySelector('.cmp-herobanner');
  if (cmpHerobanner) {
    const imageWrapper = getChildByClass(cmpHerobanner, 'cmp-herobanner__image-wrapper');
    if (imageWrapper) {
      // Use the <picture> or <img> as the image element
      const picture = imageWrapper.querySelector('picture');
      if (picture) {
        imageEl = picture;
      } else {
        const img = imageWrapper.querySelector('img');
        if (img) imageEl = img;
      }
    }
  }

  // 2. Get the title (h1)
  let titleEl = null;
  if (cmpHerobanner) {
    const card = getChildByClass(cmpHerobanner, 'cmp-herobanner__card');
    if (card) {
      const text = getChildByClass(card, 'cmp-herobanner__text');
      if (text) {
        const titleWrap = getChildByClass(text, 'cmp-herobanner__title');
        if (titleWrap) {
          const brandTitle = titleWrap.querySelector('.cmp-title');
          if (brandTitle) {
            const h1 = brandTitle.querySelector('h1, h2, h3, h4, h5, h6');
            if (h1) titleEl = h1;
          }
        }
      }
    }
  }

  // 3. Compose the table rows
  const rows = [];
  // Header row
  rows.push(['Hero']);
  // Image row
  rows.push([imageEl ? imageEl : '']);
  // Content row (title only in this case)
  const content = [];
  if (titleEl) content.push(titleEl);
  rows.push([content]);

  // 4. Create the table and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
