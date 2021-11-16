function createBreak(galleryDOM, imageLoaded) {
  let breakImage = Array.from(galleryDOM.children).slice(imageLoaded - 1)[0];
  if (!breakImage) return;
  // Create DOM with data-id equal gallery data-id
  const dataIDGallery = galleryDOM.getAttribute("data-id");
  const scrollDOM = `<div data-id="${dataIDGallery}" />`;
  breakImage.insertAdjacentHTML('afterend', scrollDOM);

  const scrollDOMSelect = document.querySelector(`div[data-id="${dataIDGallery}"]`);
  return scrollDOMSelect;
}

function createLoadmoreGallery(galleryDOM, galleryDB) {
  const { loadmore } = galleryDB.gallery.settings;
  if (!loadmore.enable) return;
  let imageLoaded = loadmore.load;
  const IMAGES_LENGTH = galleryDB.images.length;
  if (!galleryDOM || !window.IntersectionObserver) return;
  
  let scrollDOMSelect = createBreak(galleryDOM, imageLoaded);

  const observer = new IntersectionObserver(function (entries) {
    const blocksGallery = Array.from(galleryDOM.children);
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Loadmore when scroll
        blocksGallery.slice(imageLoaded, imageLoaded * 2 + 1).forEach((blockDOM) => {
          const imageItem = blockDOM.querySelector('img');
          if (!imageItem) return;
          const originSrc = imageItem.getAttribute('data-src');
          if (!originSrc) return;
          imageItem.setAttribute('src', originSrc);
          blockDOM.classList.remove('e-gallery_hidden');
        });
        imageLoaded = imageLoaded * 2;

        observer.unobserve(entry.target);
        scrollDOMSelect.remove();

        // scrollDOMSelect = createBreak(galleryDOM, imageLoaded);
        // observer.observe(scrollDOMSelect)
      }
    });
  }, { rootMargin: "0px 0px -200px 0px" });

  observer.observe(scrollDOMSelect)
}

export { createLoadmoreGallery };