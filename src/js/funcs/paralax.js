function parallaxAnimation() {
  window.addEventListener('scroll', function() {
    const target = document.querySelectorAll('.parallax');
    let index = 0, length = target.length;
    for (index; index < length; index++) {
      const pos = window.pageYOffset * target[index].dataset.rate;
      target[index].style.transform = `translate3d(0px,${pos}px, 0px)`;
    }
  });
}

export { parallaxAnimation };
