import { effectBase } from '../effects';

function loadmoreFn(galleryDOM, galleryDB, blockSorted, displayActive) {
  const { loadmore } = galleryDB.gallery.settings;
  if (!loadmore.enable) return;
  let imageLoaded = loadmore.load;

  // Handle for scroll loadmore
  function showMoreBlock(endPos) {
    blockSorted.forEach((blockItem, ind) => {
      const galleryShow = galleryDOM.querySelector(`.e-gallery__item[id="${blockItem.id}"]`);
      if (ind < endPos) {
        galleryShow.classList.remove('e-gallery_hidden');
        galleryShow.firstElementChild.innerHTML = effectBase(blockItem, galleryDB);
      } else {
        galleryShow.classList.add('e-gallery_hidden');
      }
    });
    return blockSorted[endPos - 1];
  }

  function autoHeightGridGallery(lastBlockDOM) {
    if (typeof lastBlockDOM === 'undefined') return;
    galleryDOM.style.gridTemplateRows = `repeat(${lastBlockDOM.layout[displayActive].y + lastBlockDOM.layout[displayActive].h}, 50px)`;
  }

  // First I'll show items equal items loadmore
  const lastBlockDOMAfterCreateFirstBlock = showMoreBlock(imageLoaded);
  if (loadmore.typeLoad === 'button') autoHeightGridGallery(lastBlockDOMAfterCreateFirstBlock);

  let lastBlock = galleryDOM.querySelector(`.e-gallery__item:nth-child(${imageLoaded})`);
  if (loadmore.typeLoad === 'infinity-scroll') {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const lastBlockDOM = showMoreBlock(imageLoaded + loadmore.load);
          autoHeightGridGallery(lastBlockDOM);
          imageLoaded = imageLoaded + loadmore.load;
          const newLastBlock = galleryDOM.querySelector(`.e-gallery__item:nth-child(${imageLoaded})`);
          if (newLastBlock) {
            lastBlock = newLastBlock;
            observer.observe(lastBlock)
          }
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -400px 0px" });
    // Register observer item
    observer.observe(lastBlock)
  } else {
    const galleryID = galleryDOM.getAttribute('data-id');
    // Fix resize reinit quá nhiều
    if (document.querySelector(`button[id="${galleryID}"]`)) return;
    const btn = `<button id="${galleryID}">Loadmore</button>`;
    galleryDOM.insertAdjacentHTML('afterend', btn);
    const buttonLoadmoreDOM = document.querySelector(`button[id="${galleryID}"]`);
    if (!buttonLoadmoreDOM) return;
    buttonLoadmoreDOM.onclick = function() {
      // Add class loading vào đây
      buttonLoadmoreDOM.classList.add('loading');
      const lastBlockDOM = showMoreBlock(imageLoaded + loadmore.load);
      if (typeof lastBlockDOM === 'undefined') buttonLoadmoreDOM.remove();
      autoHeightGridGallery(lastBlockDOM);
      imageLoaded = imageLoaded + loadmore.load;
      const newLastBlock = galleryDOM.querySelector(`.e-gallery__item:nth-child(${imageLoaded})`);
      if (newLastBlock) lastBlock = newLastBlock;
      // Remove loading
      buttonLoadmoreDOM.classList.remove('loading');
    }
  }
}

export { loadmoreFn };