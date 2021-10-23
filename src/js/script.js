import { getJsonByShop } from './helper/get-json';
import { LOADING_SVG } from './constant';

class Gallery {
  constructor() {
    this.loadingDOM = LOADING_SVG;
  }
  
  async init() {
    const galleriesDOM = document.querySelectorAll('e-gallery-widget');

    if (galleriesDOM.length) {
      Array.from(galleriesDOM).forEach((galleryDOMItem) => {
        this.genGallery(galleryDOMItem);
      });
    }
  }

  async genGallery(galleryDOMArg) {
    try {
      const galleryDOM = galleryDOMArg.getAttribute('data-id');
      galleryDOMArg.innerHTML = this.loadingDOM;
      const galleryDB = await getJsonByShop(galleryDOM);
      const totalBlockY = this.getLastBlock(galleryDB.images);

      galleryDOMArg.style.cssText = this.buildCSSGallery(totalBlockY, galleryDB.gallery);
      galleryDOMArg.innerHTML = this.buildImageGallery(galleryDB.images);
    } catch (error) {
      // Nếu có lỗi sẽ thông báo ở đây
      console.log(error);
    }
  }

  getLastBlock(images) {
    let maxY = 0, ind = [];
    images.forEach(({ layout }) => {
      if ((layout.xl.y + layout.xl.h) >= maxY) {
        maxY = layout.xl.y + layout.xl.h;
      }
    });

    return maxY;
  }

  // Hàm này sẽ build css cho gallery
  buildCSSGallery(totalBlockY, gallerySettings) {
    const {
      // title, description, positionTitle,
      settings,
      // Gap grid
      rowGap, columnGap,
    } = gallerySettings;

    // !Đoạn này sau cần làm responsive
    return `grid-gap: ${rowGap.xl}px ${columnGap.xl}px;
    grid-template-rows: repeat(${totalBlockY}, ${settings.rowHeight}px)`;
  }

  // Item trong gallery
  buildImageGallery(images) {
    let imagesDOM = '';

    images.forEach((image) => {
      imagesDOM += `
        <div class="e-gallery__item" ${this.genCSSImageLayout(image.layout)}>
          ${this.genImageByEffect(image.effect)}
          <img class="e-gallery__image" alt="${image.alt}" src="${image.src}" />
        </div>
      `;
    });

    return imagesDOM;
  }

  // Build css layout cho item
  genCSSImageLayout(layout) {
    let cssImageLayout = '';

    Object.keys(layout).forEach((display) => {
      const layoutObj = layout[display];
      // display là tên màn hình
      switch (display) {
        case 'xl': {
          cssImageLayout += `grid-column: ${layoutObj.x + 1}/ span ${layoutObj.w};
          grid-row: ${layoutObj.y + 1}/ span ${layoutObj.h}`;
          break;
        }
      
        default:
          break;
      }
    });

    return cssImageLayout ? `style="${cssImageLayout}"` : '';
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