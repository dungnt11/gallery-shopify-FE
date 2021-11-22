import { genResponsiveCode } from '../helper/responsive';
import { DISPLAY } from '../constant';
import { effectBase } from '../effects';
import { boxFn } from './box';
import { buildBackgroundFn } from './background';
import { aosDOMFnc } from './aos';

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
function buildLayoutFn(galleryDOMArg, galleryDB, galleryHandle, customImage) {
  const { gallery } = galleryDB;
  const images = customImage || galleryDB.images;
  const { settings, rowGap, columnGap } = gallery;
  const {
    box,
    background,
    limit,
    loadmore,
  } = settings;

  let imagesDOM = '';
  let cssAppend = '';
  const aosScrollAnimation = aosDOMFnc(galleryDB.gallery.settings.scrollAnimation);

  images.forEach((image) => {
    const lastBlock = getLastBlock(images);
    const classHideElement = (limit.enable || loadmore.enable) ? ' e-gallery_hidden' : '';
    const marginTop = image.effect.margin;

    imagesDOM += `
      <div
        class="e-gallery__item${classHideElement}"
        id="${image.id}"
        ${aosScrollAnimation}
      >
        ${
          (image.effect.video.enable && image.effect.video.url) ? (
            `<a href="${image.effect.video.url}" class="glightbox">
              ${classHideElement ? '<div></div>' : effectBase(image, galleryDB, classHideElement)}
            </a>`
          ) : (
            `<a href="${image.src}" class="glightbox">
              ${classHideElement ? '<div></div>' : effectBase(image, galleryDB, classHideElement)}
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
          grid-row: ${layoutObj.y + 1}/ span ${layoutObj.h};
          ${marginTop[display] ? `margin-top: ${marginTop[display]}px;` : ""}
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

  cssAppend += `e-gallery-widget[data-id="${galleryHandle}"] figure:after {
    background: ${gallery.effect.bgColor.color}
  }`
  cssAppend += `e-gallery-widget[data-id="${galleryHandle}"] figcaption, e-gallery-widget[data-id="${galleryHandle}"] figcaption p {
    color: ${gallery.effect.textColor.color} !important
  }`

  cssAppend += boxFn(galleryHandle, box);
  cssAppend += buildBackgroundFn(galleryHandle, background);

  galleryDOMArg.innerHTML = imagesDOM;
  return cssAppend;
}

export { buildLayoutFn };
