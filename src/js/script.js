import AOS from 'aos';
import GLightbox from 'glightbox';
import { getJsonByShop } from './helper/get-json';
import { effectBase } from './effects';
import { DISPLAY, LOADING_SVG } from './constant';
import { genResponsiveCode } from './helper/responsive';
import { injectCSSToHead } from './helper/injectCSStoHead';

class Gallery {
  constructor() {
    this.loadingDOM = LOADING_SVG;
    this.cssBase = '';
    this.aos = null;
    this.glightbox = null;
    /**
     * Khi preview mỗi gallery, từ app thì cái này sẽ là true
     * Cái này dùng để active hiệu ứng aos khi user cuộn chuột xuống
     */
    this.isPreview = false;
  }
  
  async init() {
    const galleriesDOM = document.querySelectorAll('e-gallery-widget');

    if (galleriesDOM.length) {
      let isInitParallax = false;
      let isInitAos = false;

      await Promise.all(Array.from(galleriesDOM).map((galleryDOMItem) => this.genGallery(galleryDOMItem, (settingsGallery) => {
        // Callback gallery, chỉ cần 1 gallery có cái này sẽ enable
        if (settingsGallery.parallax.enable) isInitParallax = true;
        if (settingsGallery.scrollAnimation.enable) isInitAos = true;
      })));
      // Gen css cho toàn bộ gallery
      injectCSSToHead(this.cssBase);

      if (isInitParallax) {
        this.genParallaxEffect();
      }
      if (isInitAos) {
        this.aos = AOS.init({ startEvent: 'DOMContentLoaded' });
      }
      this.glightbox = GLightbox({ startEvent: 'DOMContentLoaded' });
    }
  }

  async genGallery(galleryDOMArg, cb) {
    try {
      const galleryHandle = galleryDOMArg.getAttribute('data-id');
      galleryDOMArg.innerHTML = this.loadingDOM;
      const galleryDB = await getJsonByShop(galleryHandle);
      cb(galleryDB.gallery.settings)
      this.buildGalleryCss(galleryHandle, galleryDB);
      galleryDOMArg.innerHTML = this.buildImageGallery(galleryDB, galleryHandle);
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

    const { background, box } = settings;

    DISPLAY.forEach((display) => {
      this.cssBase += genResponsiveCode(display, `
        e-gallery-widget[data-id="${galleryHandle}"] {
          background: ${background.solid.color};
          border-radius: ${box.radius}px;
          grid-gap: ${rowGap[display]}px ${columnGap[display]}px;
          grid-template-rows: repeat(${lastBlock[display]}, ${settings.rowHeight}px)
        }
        e-gallery-widget[data-id="${galleryHandle}"] .e-image-item {
          border-radius: ${box.radiusImage}px;
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
  buildImageGallery(galleryDB, galleryHandle) {
    const { images, gallery } = galleryDB;
    const { settings } = gallery;
    const { scrollAnimation, parallax, box } = settings;
    const {
      enable,
      animation,
      anchorPlacements,
      easingFunctions,
    } = scrollAnimation;

    let imagesDOM = '';

    images.forEach((image) => {
      imagesDOM += `
        <div
          class="e-gallery__item ${settings.fullWidth ? 'e-gallery__fullwidth' : ''}"
          id="${image.id}"
          ${enable ? `data-aos="${animation || 'zoom-in'}"
          data-aos-offset="200"
          data-aos-delay="50"
          data-aos-duration="300"
          data-aos-easing="${easingFunctions || 'ease-in-out'}"
          data-aos-once="true"
          data-aos-anchor-placement="${anchorPlacements || 'top-center'}"
          ${this.isPreview ? 'data-aos-anchor="body"' : ''}` : ''}
        >
          <a href="${image.src}" class="glightbox">
            ${effectBase(image, parallax, box)}
          </a>
        </div>
      `;

      DISPLAY.forEach((display) => {
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

  genParallaxEffect() {
    window.addEventListener('scroll', function() {
      const target = document.querySelectorAll('.parallax');
      let index = 0, length = target.length;
      for (index; index < length; index++) {
          const pos = window.pageYOffset * target[index].dataset.rate;
          target[index].style.transform = `translate3d(0px,${pos}px, 0px)`;
      }
    });
  }
}

const gallery = new Gallery();
// Initial
gallery.init();