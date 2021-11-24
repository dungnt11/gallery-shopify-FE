function parallaxAnimation() {
  window.addEventListener('scroll', function() {
    const target = document.querySelectorAll('.parallax');
    let index = 0, length = target.length;
    for (index; index < length; index++) {
      const pos = window.pageYOffset * target[index].dataset.rate;
      const imgItem = target[index];
      const parentWrapperItem = target[index].closest('.e-gallery__item');
      if (!imgItem || !parentWrapperItem) return;
      const rect = parentWrapperItem.getBoundingClientRect();
      if (imgItem.height - rect.height <= pos) return;
      target[index].style.transform = `translate3d(0px,${pos}px, 0px)`;
      // override transition transform
      target[index].style.transition = 'unset';
    }
  });
}

export { parallaxAnimation };
