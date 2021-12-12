function lazyload(galleryDB) {
  const {
    loadmore,
    typeFilter, isEnableFilter,
  } = galleryDB.gallery.settings;

  if (!(typeFilter === 'loadmore' && isEnableFilter && loadmore.typeLoad === 'infinity-scroll')) {
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
            const isChangeSrc = entry.target.getAttribute('src');
            if (!isChangeSrc && dataSrc) entry.target.setAttribute('src', dataSrc);
            observer.unobserve(entry.target);
          }
        });
      }, { rootMargin: "0px 0px -20px 0px" });
      observer.observe(imageDOM);
    });
  }
}

export { lazyload };