import { btn1, btn2 } from '../buttons';

function loadmoreFn(galleryDOM, galleryDB, blockSorted, displayActive) {
  const { loadmore, typeFilter, isEnableFilter, scrollAnimation } = galleryDB.gallery.settings;
  if (typeFilter === 'loadmore' && isEnableFilter) {
    let imageLoaded = loadmore.load;
  
    // Tính width height wrapper gallery cho vừa
    function autoHeightGridGallery(lastBlockDOM) {
      if (typeof lastBlockDOM === 'undefined') return;
      galleryDOM.style.gridTemplateRows = `repeat(${lastBlockDOM.layout[displayActive].y + lastBlockDOM.layout[displayActive].h}, 50px)`;
    }

    function getIDImageShow(quantily) {
      return blockSorted.slice(0, quantily).map((e) => e.id);
    }

    if (!(scrollAnimation.enable && loadmore.typeLoad === 'infinity-scroll')) {
      // Hide block image
      blockSorted.slice(imageLoaded).map((e) => e.id).forEach((idBlock) => {
        const blockItem = galleryDOM.querySelector(`.e-gallery__item[id="${idBlock}"]`);
        if (blockItem) blockItem.classList.add('e-gallery_hidden');
      });
    }

    // lastBlock trong mảng images
    function observeMe(lastBlock) {
      const DOMLastBlock = galleryDOM.querySelector(`.e-gallery__item[id="${lastBlock.id}"]`);
      if (DOMLastBlock) {
      const observer = new IntersectionObserver(function (entries) {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            imageLoaded = imageLoaded + loadmore.load;
            getIDImageShow(imageLoaded).forEach((id) => {
              const blockItem = galleryDOM.querySelector(`.e-gallery__item[id="${id}"]`);
              const imageBlock = blockItem.querySelector('img');
              if (blockItem && imageBlock) {
                const dataSrc = imageBlock.getAttribute('data-src');
                if (dataSrc) imageBlock.setAttribute('src', dataSrc);
                blockItem.classList.remove('e-gallery_hidden');
                blockItem.classList.remove('e-loading');
              }
            });
            autoHeightGridGallery(blockSorted[imageLoaded - 1]);
            observer.unobserve(entry.target);
            if (blockSorted[imageLoaded - 1]) {
              observeMe(blockSorted[imageLoaded - 1]);
            }
            imageLoaded = imageLoaded + loadmore.load;
          }
        });
      }, { rootMargin: "0px 0px -20px 0px" });
      // Register observer item
      observer.observe(DOMLastBlock);
    }
  }
  
    // Scroll to loadmore
    if (loadmore.typeLoad === 'infinity-scroll') {
      // Scroll animation conflict với hiệu ng này
      if (scrollAnimation.enable) return;
      const lastBlock = blockSorted[imageLoaded - 1];
      observeMe(lastBlock);
    } else {
      // Button loadmore
      autoHeightGridGallery(blockSorted[imageLoaded - 1]);
      const galleryID = galleryDOM.getAttribute('data-id');
      // Fix resize reinit quá nhiều
      if (document.querySelector(`button[id="${galleryID}"]`)) return;
      let btn = '';
      let colorBtn = '';
  
      switch (loadmore.color) {
        case 1:
          colorBtn = '';
          break;
        case 2:
          colorBtn = ' secondary';
          break;
        case 3:
          colorBtn = ' bordered';
          break;
  
        default:
          break;
      }
  
      switch (loadmore.animation) {
        case 1:
          btn = btn1(galleryID, false, colorBtn);
          break;
        case 2:
          btn = btn2(galleryID, false, colorBtn);
          break;
      
        default:
          break;
      }
  
      galleryDOM.insertAdjacentHTML('afterend', btn);
      const buttonLoadmoreDOM = document.querySelector(`button[id="${galleryID}"]`);
      if (!buttonLoadmoreDOM) return;
      buttonLoadmoreDOM.onclick = function() {
        // Add class loading vào đây
        buttonLoadmoreDOM.classList.add('loading-start');
        buttonLoadmoreDOM.setAttribute('disabled', 'true');
        const progressDOM = buttonLoadmoreDOM.querySelector(".progress");
        if (progressDOM) {
          progressDOM.style.visibility = 'visible';
          progressDOM.style.display = 'block';
        }
        // Fake loading
        setTimeout(() => {
          imageLoaded = imageLoaded + loadmore.load;

          if (imageLoaded === galleryDB.images.length) buttonLoadmoreDOM.remove();

          getIDImageShow(imageLoaded).forEach((id, ind) => {
            const blockItem = galleryDOM.querySelector(`.e-gallery__item[id="${id}"]`);
            if (blockItem) {
              blockItem.classList.remove('e-gallery_hidden');
            }

            if (ind + 1 === imageLoaded) autoHeightGridGallery(blockSorted[ind]);
          });
          // Remove loading
          buttonLoadmoreDOM.classList.remove('loading-start');
          buttonLoadmoreDOM.removeAttribute('disabled');
          if (progressDOM) {
            progressDOM.style.visibility = 'hidden';
            progressDOM.style.display = 'none';
          }
        }, 200);
      }
    }
  }
}

export { loadmoreFn };