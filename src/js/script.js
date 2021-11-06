import { injectCSSToHead } from './helper/injectCSStoHead';
// Func
import { AosBase } from './funcs/aos';
import { parallaxAnimation } from './funcs/paralax';
import { loadingFn } from './funcs/loading';
import { buildLayoutFn } from './funcs/layout';
import { LightBox } from './funcs/lightbox';
import { titleAndDescriptionFnc } from './funcs/titleAndDescription';

class Gallery {  
  async init() {
    const galleriesDOM = document.querySelectorAll('e-gallery-widget');
    if (!galleriesDOM.length) return;
    // Biến để kiểm tra DOM khởi tạo 1 lần
    let isInitParallax = false;
    let isInitAos = false;

    await Promise.all(Array.from(galleriesDOM).map(async (galleryDOMArg) => {
      const [galleryHandle, galleryDB] = await loadingFn(galleryDOMArg);
      const cssLayout = buildLayoutFn(galleryDOMArg, galleryDB, galleryHandle);
      injectCSSToHead(cssLayout);
      titleAndDescriptionFnc(galleryDOMArg, galleryDB.gallery);
      if (galleryDB.gallery.settings.parallax.enable) isInitParallax = true;
      if (galleryDB.gallery.settings.scrollAnimation.enable) isInitAos = true;
    }));

    if (isInitParallax) parallaxAnimation();
    if (isInitAos) new AosBase();
    new LightBox();
  }
}

const gallery = new Gallery();
// Initial
gallery.init();