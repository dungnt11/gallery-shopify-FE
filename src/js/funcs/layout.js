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
    limit,
    loadmore,
    typeFilter, isEnableFilter,
  } = settings;

  let imagesDOM = '';
  let cssAppend = '';
  const aosScrollAnimation = aosDOMFnc(galleryDB.gallery.settings.scrollAnimation);

  // Build overlay gallery
  cssAppend += `
    e-gallery-widget[data-id="${galleryHandle}"] .e-gallery__item:hover img {
      opacity: ${effect.opacityImage / 100};
    }
  `;

  images.forEach((image) => {
    const lastBlock = getLastBlock(images);
    const classHideElement = (limit.enable || loadmore.enable) ? ' e-gallery_hidden' : '';
    const marginTop = image.effect.margin;

    imagesDOM += `
      <div
        class="e-gallery__item${classHideElement} e-loading"
        id="${image.id}"
        ${aosScrollAnimation}
      >
        ${
          (image.effect.video.enable && image.effect.video.url) ? (
            `<a href="${image.effect.video.url}" class="glightbox">
              ${classHideElement ? '<div></div>' : effectBase(image, galleryDB, classHideElement)}
            </a>`
          ) : (
            `<a href="${image.effect.link ? buildLinkRedirect(image.effect.link) : image.src}" ${!image.effect.link ? 'class="glightbox"' : ''}>
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
      } else {
        cssAppend += genResponsiveCode(display, `
          e-gallery-widget[data-id="${galleryHandle}"] {
            width: calc(100% - 20px);
          }
        `);
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

  if (typeFilter !== 'loadmore' && !isEnableFilter) {
    document.querySelectorAll('.e-gallery__item').forEach((galleryItemDOM) => {
      const imageDOM = galleryItemDOM.querySelector('img');
      if (!imageDOM) return;
      imageDOM.addEventListener('load', function() {
        galleryItemDOM.classList.remove('e-loading');
      });
      const observer = new IntersectionObserver(function (entries) {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const dataSrc = entry.target.getAttribute('data-src');
            if (dataSrc) {
              entry.target.setAttribute('src', dataSrc);
            }
            observer.unobserve(entry.target);
          }
        });
      }, { rootMargin: "0px 0px -20px 0px" });
      observer.observe(imageDOM);
    });
  }

  return cssAppend;
}

export { buildLayoutFn };
