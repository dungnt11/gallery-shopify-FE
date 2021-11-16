import { getThumbnailSrcImage } from '../helper/thumbnail-src-image';
import { effectLimitBase, effectBase } from '../effects';

function limitFn(galleryDOMArg, galleryDB, displayActive) {
  if (!displayActive) displayActive = 'xs';
  const { images, gallery } = galleryDB;
  const { settings } = gallery;

  const imageSort = images.sort((a, b) => {
    if (a.layout[displayActive].y === b.layout[displayActive].y) return a.layout[displayActive].x - b.layout[displayActive].x;
    return a.layout[displayActive].y - b.layout[displayActive].y;
  });

  if (settings.limit.enable) {
    const limitItem = settings.limit.items + 1;

    imageSort.forEach((galleryItem, ind) => {
      const galleryShow = galleryDOMArg.querySelector(`.e-gallery__item[id="${galleryItem.id}"]`);
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
        const prevGalleryShow = galleryDOMArg.querySelector(`.e-gallery__item[id="${imageSort[ind -1].id}"]`);
        let prevClass = '';
        if (prevGalleryShow) {
          const figureDOM = prevGalleryShow.querySelector('.e-image-item');
          if (figureDOM) {
            prevClass = ` ${figureDOM.classList}`;
          }
        }
        galleryShow.firstElementChild.innerHTML = effectLimitBase(galleryItem, galleryDB, prevClass);
      }
    });
  }
}

export { limitFn };
