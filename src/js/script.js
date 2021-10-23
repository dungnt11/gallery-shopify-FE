import { getJsonByShop } from './helper/get-json';
import { LOADING_SVG } from './constant';
import { genResponsiveCode } from './helper/responsive';
import { injectCSSToHead } from './helper/injectCSStoHead';

class Gallery {
  constructor() {
    this.loadingDOM = LOADING_SVG;
    this.cssBase = '';
  }
  
  async init() {
    const galleriesDOM = document.querySelectorAll('e-gallery-widget');

    if (galleriesDOM.length) {
      await Promise.all(Array.from(galleriesDOM).map((galleryDOMItem) => this.genGallery(galleryDOMItem)));
      // Gen css cho toàn bộ gallery
      injectCSSToHead(this.cssBase);
    }
  }

  async genGallery(galleryDOMArg) {
    try {
      const galleryHandle = galleryDOMArg.getAttribute('data-id');
      galleryDOMArg.innerHTML = this.loadingDOM;
      const galleryDB = await getJsonByShop(galleryHandle);
      this.buildGalleryCss(galleryHandle, galleryDB);
      galleryDOMArg.innerHTML = this.buildImageGallery(galleryDB.images, galleryHandle);
    } catch (error) {
      // Nếu có lỗi sẽ thông báo ở đây
      console.log(error);
    }
  }

  // CSS tổng cho gallery
  buildGalleryCss(galleryHandle, galleryDB) {
    const { gallery, images } = galleryDB;
    const lastBlock = this.getLastBlock(images);

    const {
      // title, description, positionTitle,
      settings,
      // Gap grid
      rowGap, columnGap,
    } = gallery;

    Object.keys(rowGap).forEach((display) => {
      this.cssBase += genResponsiveCode(display, `
        e-gallery-widget[data-id="${galleryHandle}"] {
          grid-gap: ${rowGap[display]}px ${columnGap[display]}px;
          grid-template-rows: repeat(${lastBlock[display]}, ${settings.rowHeight}px)
        }
      `);
    });
  }

  getLastBlock(images) {
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

  // Item trong gallery
  buildImageGallery(images, galleryHandle) {
    let imagesDOM = '';

    images.forEach((image) => {
      imagesDOM += `
        <div class="e-gallery__item" id="${image.id}">
          ${this.genImageByEffect(image.effect)}
          <img class="e-gallery__image" alt="${image.alt}" src="${image.src}" />
        </div>
      `;

      Object.keys(image.layout).forEach((display) => {
        const layoutObj = image.layout[display];

        this.cssBase += genResponsiveCode(display, `
          e-gallery-widget[data-id="${galleryHandle}"] #${image.id} {
            grid-column: ${layoutObj.x + 1}/ span ${layoutObj.w};
            grid-row: ${layoutObj.y + 1}/ span ${layoutObj.h}
          }
      `);
      });
    });

    return imagesDOM;
  }

  // Build image effect cho từng ảnh
  genImageByEffect(effect) {
    //

    return '';
  }
}

const gallery = new Gallery();
// Initial
gallery.init();