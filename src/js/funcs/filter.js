import { buildLayoutFn } from '../funcs/layout';
import { injectCSSToHead, removeCSSInHead } from '../helper/injectCSStoHead';

function filterFn(galleryDOMArg, galleryDB) {
  let preLabel = 'ALL';
  const { filter } = galleryDB.gallery.settings;
  if (!filter.enable) return;

  const ID_GALLERY = galleryDOMArg.getAttribute('data-id');
  if (document.querySelector(`.e-gallery_wrapper[data-id="${ID_GALLERY}"]`)) return;

  // Default active ALL label
  const allLabel = `
  <div class="e-gallery_filter__item e-gallery_filter__active" data-label="ALL">
    ${filter.allText}${filter.enableCount ? `<sub>(${galleryDB.images.length})</sub>` : ''}
  </div>
  `;

  const otherLabel = `${filter.groupBy.map(({ images, label }, ind) => `
  <div class="e-gallery_filter__item" data-label="${ind}">
    ${label}${filter.enableCount ? `<sub>(${images.length})</sub>` : ''}
  </div>
  `).join('')}`;

  const filterLabelDOM = `
    <div class="e-gallery_wrapper" data-id="${ID_GALLERY}">
      ${allLabel}
      ${otherLabel}
    </div>
  `;
  galleryDOMArg.insertAdjacentHTML('beforebegin', filterLabelDOM);

  const labelSelected = document.querySelector(`.e-gallery_wrapper[data-id="${ID_GALLERY}"]`);

  const filterLookupByLabelFn = (filterLabel) => filterLabel.images.reduce((prev, curr) => {
    prev[curr.id] = curr.layout;
    return prev;
  }, {});

  function removeActiveLabel() {
    Array.from(labelSelected.children).forEach((labelItem) => {
      labelItem.classList.remove('e-gallery_filter__active');
    });
  }

  Array.from(labelSelected.children).forEach((labelGallery) => {
    labelGallery.onclick = function() {
      const dataLabel = labelGallery.getAttribute('data-label');
      if (preLabel === dataLabel) return;
      removeActiveLabel();
      labelGallery.classList.add('e-gallery_filter__active');
      if (dataLabel === 'ALL') {
        galleryDOMArg.innerHTML = '';
        const cssBuilder = buildLayoutFn(galleryDOMArg, galleryDB, ID_GALLERY);
        removeCSSInHead(ID_GALLERY);
        injectCSSToHead(cssBuilder, ID_GALLERY);
      } else {
        const labelGroup = filter.groupBy[+dataLabel];
        const labelLookup = filterLookupByLabelFn(labelGroup || -1);
        if (labelLookup) {
          const blocksBuilder = [];
          JSON.parse(JSON.stringify(galleryDB.images)).forEach((image) => {
            if (labelLookup[image.id]) {
              image.layout = labelLookup[image.id];
              blocksBuilder.push(image);
            }
          });
          // Remove all content gallery and reinit
          galleryDOMArg.innerHTML = '';
          const cssBuilder = buildLayoutFn(galleryDOMArg, galleryDB, ID_GALLERY, blocksBuilder);
          removeCSSInHead(ID_GALLERY);
          injectCSSToHead(cssBuilder, ID_GALLERY);
        }
      }

      preLabel = dataLabel;
    }
  });
}

export { filterFn };