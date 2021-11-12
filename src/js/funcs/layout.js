import { genResponsiveCode } from '../helper/responsive';
import { DISPLAY } from '../constant';
import { effectBase, effectLimitBase } from '../effects';
import { boxFn } from './box';
import { buildBackgroundFn } from './background';
import { aosDOMFnc } from './aos';

// Lấy effect trước đó đồng bộ với limit hiện tại
function asyncEffect(galleryDOM) {
  const limitDOM = galleryDOM.querySelector('.effect-limit');
  if (!limitDOM) return;
  const parentDOM = limitDOM.closest('.e-gallery__item');
  if (!parentDOM) return;
  const preDOM = parentDOM.previousSibling.previousSibling;
  if (!preDOM) return;
  const figureDOM = preDOM.querySelector('.e-image-item');
  if (!figureDOM) return;
  limitDOM.classList.add(...Array.from(figureDOM.classList || []));
}

function getLastBlock(images) {
  const maxY = {};
  images.forEach(({ layout }) => {
    Object.keys(layout).forEach((display) => {
      if (!maxY[display]) maxY[display] = 0;
      if ((layout[display].y + layout[display].h) >= maxY[display]) {
        maxY[display] = layout[display].y + layout[display].h;
      }
    });
  });

  return maxY;
}

// Build layout gallery
function buildLayoutFn(galleryDOMArg, galleryDB, galleryHandle) {
  const { images, gallery } = galleryDB;
  const { settings, rowGap, columnGap } = gallery;
  const {
    box,
    background,
    parallax,
    limit,
  } = settings;

  let imagesDOM = '';
  let cssAppend = '';
  const aosScrollAnimation = aosDOMFnc(galleryDB.gallery.settings.scrollAnimation);

  images.forEach((image, ind) => {
    const lastBlock = getLastBlock(limit.enable ? images.slice(0, limit.items) : images);
    const isHideElement = (limit.enable && ind > limit.items) ? ' e-gallery_hidden' : '';

    imagesDOM += `
      <div
        class="e-gallery__item${isHideElement}"
        id="${image.id}"
        ${aosScrollAnimation}
      >
        ${
          (image.effect.video.enable && image.effect.video.url) ? (
            `<a href="${image.effect.video.url}" class="glightbox">
              ${limit.enable && limit.idImageShowButton === image.id ? effectLimitBase(image, galleryDB) : effectBase(image, parallax)}
            </a>`
          ) : (
            `<a href="${image.src}" class="glightbox">
              ${limit.enable && limit.idImageShowButton === image.id ? effectLimitBase(image, galleryDB) : effectBase(image, parallax)}
            </a>`
          )
        }
      </div>
    `;

    DISPLAY.forEach((display) => {
      const layoutObj = image.layout[display];

      cssAppend += genResponsiveCode(display, `
        e-gallery-widget[data-id="${galleryHandle}"] #${image.id} {
          grid-column: ${layoutObj.x + 1}/ span ${layoutObj.w};
          grid-row: ${layoutObj.y + 1}/ span ${layoutObj.h}
        }
      `);
      cssAppend += genResponsiveCode(display, `
        e-gallery-widget[data-id="${galleryHandle}"] {
          grid-gap: ${rowGap[display]}px ${columnGap[display]}px;
          grid-template-rows: repeat(${lastBlock[display]}, ${settings.rowHeight}px);
          width: calc(${settings.fullWidth.enable ? `${settings.fullWidth.precentWidth}%` : '100%'} - 20px);
        }
      `);
    });
  });

  cssAppend += boxFn(galleryHandle, box);
  cssAppend += buildBackgroundFn(galleryHandle, background);

  galleryDOMArg.innerHTML = imagesDOM;
  asyncEffect(galleryDOMArg);
  return cssAppend;
}

export { buildLayoutFn };
