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
    const btn = `<button class="e-btn__loadmore" data="left-loading" id="${galleryID}">
    <svg class="animated fadeInRight" version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
       width="24px" height="24px" viewBox="0 0 50 50" style="enable-background:new 0 0 50 50;" xml:space="preserve">
      <path fill="#000" d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z">
        <animateTransform attributeType="xml"
                          attributeName="transform"
                          type="rotate"
                          from="0 25 25"
                          to="360 25 25"
                          dur="0.6s"
                          repeatCount="indefinite"/>
      </path>
    </svg>
    <span class="text">Loadmore</span>
    </button>`;
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