/**
 * Hàm này sẽ gen ra style và append chúng và head của website
 */

function injectCSSToHead(css) {
  const head = document.head || document.getElementsByTagName('head')[0],
    style = document.createElement('style');
  style.id = ''

  head.appendChild(style);

  style.type = 'text/css';
  if (style.styleSheet){
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

export { injectCSSToHead };
