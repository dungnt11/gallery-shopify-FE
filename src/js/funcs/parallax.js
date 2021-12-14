import simpleParallax from 'simple-parallax-js';

function parallaxFn(wrapperGallery, parallaxSettings) {
  const images = wrapperGallery.querySelectorAll('img');
  if (parallaxSettings.enable && images) {
    let orientation = '';
    if (parallaxSettings.orientation1 === parallaxSettings.orientation2) {
      orientation = parallaxSettings.orientation1;
    } else {
      orientation = `${parallaxSettings.orientation1}-${parallaxSettings.orientation2}`;
    }

    new simpleParallax(images, {
      orientation,
      scale: parallaxSettings.scale.replace(',', '.') || 1.2,
      delay: parallaxSettings.delay.replace(',', '.') || 0.4,
      transition: parallaxSettings.transition || 'cubic-bezier(0,0,0,1)',
    });
  }
}

export { parallaxFn };