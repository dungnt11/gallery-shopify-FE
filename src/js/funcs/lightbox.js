import GLightbox from 'glightbox';

class LightBox {
  constructor() {
    this.glightbox = GLightbox({
      startEvent: 'DOMContentLoaded',
      touchNavigation: true,
    });
  }
}

export { LightBox };