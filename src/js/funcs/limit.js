import { getThumbnailSrcImage } from '../helper/thumbnail-src-image';
import { effectLimitBase, effectBase } from '../effects';

function limitFn(galleryDOM, galleryDB, blockSorted, displayActive) {
  const { gallery } = galleryDB;
  const { settings } = gallery;
  const { typeFilter, isEnableFilter } = settings;
  if (!(typeFilter === 'limit' && isEnableFilter)) return;

  const limitItem = settings.limit.items + 1;

  blockSorted.forEach((galleryItem, ind) => {
    const galleryShow = galleryDOM.querySelector(`.e-gallery__item[id="${galleryItem.id}"]`);
    let imageItem = galleryShow.querySelector('img');
    let srcOrigin = imageItem ? imageItem.getAttribute('data-src') : undefined;
    galleryShow.classList.add('e-gallery_hidden');
    // Set inner and refind DOM
    galleryShow.firstElementChild.innerHTML = effectBase(galleryItem, galleryDB, true);
    imageItem = galleryShow.firstElementChild.querySelector('img');
    srcOrigin = imageItem ? imageItem.getAttribute('data-src') : undefined;
    if (imageItem) imageItem.setAttribute('src', '');

    if (ind < limitItem && imageItem && srcOrigin) {
      galleryShow.classList.remove('e-gallery_hidden');
      imageItem.setAttribute('src', getThumbnailSrcImage(srcOrigin));
    }

    // Create limit effect and async effect
    if (limitItem === ind + 1 && galleryShow.firstElementChild) {
      const prevGalleryShow = galleryDOM.querySelector(`.e-gallery__item[id="${blockSorted[ind -1].id}"]`);
      let prevClass = '';
      if (prevGalleryShow) {
        const figureDOM = prevGalleryShow.querySelector('.e-image-item');
        if (figureDOM) {
          prevClass = ` ${figureDOM.classList}`;
        }
      }
      galleryShow.firstElementChild.innerHTML = effectLimitBase(galleryItem, galleryDB, prevClass);
      galleryDOM.style.gridTemplateRows = `repeat(${galleryItem.layout[displayActive].y + galleryItem.layout[displayActive].h}, 50px)`;
    }
  });
}

export { limitFn };
