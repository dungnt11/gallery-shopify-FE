import { genResponsiveCode } from '../helper/responsive';
import { DISPLAY } from '../constant';
import { effectBase } from '../effects';
import { boxFn } from './box';
import { buildBackgroundFn } from './background';
import { aosDOMFnc } from './aos';

import { settingsGallery } from '../store/settings';

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

function buildLinkRedirect(link) {
  if (settingsGallery.config.isPreviewMode && (link.startsWith('collections/') || link.startsWith('products/'))) {
    return `https://${settingsGallery.settings.myshopifyDomain}/${link}`;
  }

  return link;
}

// Build layout gallery
function buildLayoutFn(galleryDOMArg, galleryDB, galleryHandle, customImage) {
  const { gallery } = galleryDB;
  const images = customImage || galleryDB.images;
  const { settings, rowGap, columnGap, effect } = gallery;
  const {
    box,
    background,
    scrollAnimation,
    fullWidth,
  } = settings;

  let imagesDOM = '';
  let cssAppend = '';
  const aosScrollAnimation = aosDOMFnc(scrollAnimation);

  if (!fullWidth.enable) {
    cssAppend += `
    e-gallery-widget[data-id="${galleryHandle}"] {
      width: 100vw;
      margin-left: calc(-50vw + 50%);
      box-sizing: border-box;
    }
  `;
  }

  // Build overlay gallery
  cssAppend += `
    e-gallery-widget[data-id="${galleryHandle}"] .e-gallery__item:hover img {
      opacity: ${effect.opacityImage / 100};
    }
  `;
  images.forEach((image) => {
    const lastBlock = getLastBlock(images);
    const marginTop = image.effect.margin;

    imagesDOM += `
      <div
        class="e-gallery__item e-loading"
        id="${image.id}"
        ${aosScrollAnimation}
      >
        ${
          (image.effect.video.enable && image.effect.video.url) ? (
            `<a href="${image.effect.video.url}" class="glightbox">
              ${effectBase(image, galleryDB)}
            </a>`
          ) : (
            `<a href="${image.effect.link ? buildLinkRedirect(image.effect.link) : image.src}" ${!image.effect.link ? 'class="glightbox"' : ''}>
              ${effectBase(image, galleryDB)}
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
          padding: ${rowGap[display]}px ${columnGap[display]}px;
        }
      `);

      if (settings.fullWidth.enable) {
        if (settings.fullWidth.enableFixedWidth) {
          cssAppend += `
            @media only screen and (min-width: 992px) {
              e-gallery-widget[data-id="${galleryHandle}"] {
                width: ${settings.fullWidth.fixedWidth}px;
              }
            }
          `;
        } else {
          cssAppend += genResponsiveCode(display, `
            e-gallery-widget[data-id="${galleryHandle}"] {
              width: calc(${settings.fullWidth.precentWidth}% - 20px);
            }
          `);
        }
      }
    });
  });

  cssAppend += `e-gallery-widget[data-id="${galleryHandle}"] figure {
    color: ${gallery.effect.textColor.color} !important;
  }`;

  cssAppend += `e-gallery-widget[data-id="${galleryHandle}"] figure {
    background: ${gallery.effect.bgColor.color};
  }`

  cssAppend += boxFn(galleryHandle, box);
  cssAppend += buildBackgroundFn(galleryHandle, background);

  galleryDOMArg.innerHTML = imagesDOM;

  return cssAppend;
}

export { buildLayoutFn };
