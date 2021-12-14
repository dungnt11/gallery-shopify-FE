// Func
import { AosBase } from './funcs/aos';
import { loadingFn } from './funcs/loading';
import { buildLayoutFn } from './funcs/layout';
import { LightBox } from './funcs/lightbox';
import { titleAndDescriptionFnc } from './funcs/titleAndDescription';
import { lazyload } from './funcs/lazyload';
import { parallaxFn } from './funcs/parallax';
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

    let isInitAos = false;

    await Promise.all(Array.from(galleriesDOM).map(async (galleryDOMArg) => {
      const [galleryHandle, galleryDB] = await loadingFn(galleryDOMArg);
      const cssLayout = buildLayoutFn(galleryDOMArg, galleryDB, galleryHandle);
      injectCSSToHead(cssLayout, galleryHandle);
      titleAndDescriptionFnc(galleryDOMArg, galleryDB.gallery);
      if (galleryDB.gallery.settings.scrollAnimation.enable) isInitAos = true;
      registerDisplay(galleryDOMArg, galleryDB);
      lazyload(galleryDB);
      parallaxFn(galleryDOMArg, galleryDB.gallery.settings.parallax);
    }));
    if (isInitAos) new AosBase();
    new LightBox();
  }
}

const gallery = new EGallery();
window.eGallery = gallery;
gallery.init();