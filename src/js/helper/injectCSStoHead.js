/**
 * Hàm này sẽ gen ra style và append chúng và head của website
 */

function injectCSSToHead(css, id) {
  const head = document.head || document.getElementsByTagName('head')[0],
    style = document.createElement('style');
  style.id = id || '';

  head.appendChild(style);

  style.type = 'text/css';
  if (style.styleSheet){
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

function removeCSSInHead(id) {
  const head = document.head || document.getElementsByTagName('head')[0];
  const styleRemoved = head.querySelector(`#${id}`);
  if (styleRemoved) styleRemoved.remove();
}

function injectCSSGlobalToHead() {
  if (process.env.NODE_ENV !== 'development') {
    const head = document.head || document.getElementsByTagName('head')[0],
      link = document.createElement('link');

    link.rel = 'stylesheet';
    link.id = 'etify-css';
    link.href = `https://css-gallery.ehandytech.com/style.min.css?v=${process.env.VERSION}`;
    head.appendChild(link);
  }
}

export { injectCSSToHead, removeCSSInHead, injectCSSGlobalToHead };
