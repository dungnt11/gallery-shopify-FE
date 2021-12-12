function parallaxAnimation() {
  window.addEventListener('scroll', function() {
    const target = document.querySelectorAll('.parallax');

    Array.from(target).forEach((imageItem) => {
      const pos = window.pageYOffset * imageItem.dataset.rate;
      const imgItem = imageItem;
      const parentWrapperItem = imageItem.closest('.e-gallery__item');
      if (!imgItem || !parentWrapperItem) return;
      const rect = parentWrapperItem.getBoundingClientRect();
      if (imgItem.height - rect.height <= pos) return;
      imageItem.style.transform = `translate3d(0px,${pos}px, 0px)`;
      // override transition transform
      imageItem.style.transition = 'unset';
    });
  });
}

export { parallaxAnimation };
