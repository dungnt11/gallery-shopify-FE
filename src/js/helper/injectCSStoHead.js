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

export { injectCSSToHead, removeCSSInHead };
