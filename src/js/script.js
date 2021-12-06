import LazyLoad from 'vanilla-lazyload';
// Func
import { AosBase } from './funcs/aos';
import { parallaxAnimation } from './funcs/paralax';
import { loadingFn } from './funcs/loading';
import { buildLayoutFn } from './funcs/layout';
import { LightBox } from './funcs/lightbox';
import { titleAndDescriptionFnc } from './funcs/titleAndDescription';
// Helper
import { registerDisplay } from './helper/breakpoint';
import { injectCSSToHead } from './helper/injectCSStoHead';
import { getJsonSettings } from './helper/get-json';

class EGallery {
  async init() {
    const galleriesDOM = document.querySelectorAll('e-gallery-widget');
    if (!galleriesDOM.length) return;
    // Fetch settings
    await getJsonSettings();

    // Biến để kiểm tra DOM khởi tạo 1 lần
    let isInitParallax = false;
    let isInitAos = false;

    await Promise.all(Array.from(galleriesDOM).map(async (galleryDOMArg) => {
      const [galleryHandle, galleryDB] = await loadingFn(galleryDOMArg);
      const cssLayout = buildLayoutFn(galleryDOMArg, galleryDB, galleryHandle);
      injectCSSToHead(cssLayout, galleryHandle);
      titleAndDescriptionFnc(galleryDOMArg, galleryDB.gallery);
      if (galleryDB.gallery.settings.parallax.enable) isInitParallax = true;
      if (galleryDB.gallery.settings.scrollAnimation.enable) isInitAos = true;
      registerDisplay(galleryDOMArg, galleryDB);
    }));

    if (isInitParallax) parallaxAnimation();
    if (isInitAos) new AosBase();

    const callback = function (element) {
      element.src = '';
      element.style.background = 'rgb(181 181 181)';
    };

    new LightBox();
    new LazyLoad({
      use_native: false,
      callback_error: callback,
      callback_enter: callback,
    });
  }
}

const gallery = new EGallery();
window.eGallery = gallery;
gallery.init();