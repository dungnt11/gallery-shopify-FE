const createThumbnail = (item, thumbSize) => {
  if (typeof item === 'undefined') return '';
  let newURL = (item && item) || item;
  if (!newURL) {
    return;
  };
  if (typeof item === 'string' && item.includes('cdn.shopify.com')) {
    /** Nếu giá trị truyền vào là url thay vì object ảnh */
    newURL = item.replace('.jpg', `_${thumbSize}.jpg`).replace('.JPG', `_${thumbSize}.JPG`)
      .replace('.png', `_${thumbSize}.png`).replace('.PNG', `_${thumbSize}.PNG`)
      .replace('.jpeg', `_${thumbSize}.jpeg`).replace('.JPEG', `_${thumbSize}.JPEG`);
  }
  if (item && item.includes('cdn.shopify.com')) {
    newURL = item.replace('.jpg', `_${thumbSize}.jpg`).replace('.JPG', `_${thumbSize}.JPG`)
      .replace('.png', `_${thumbSize}.png`).replace('.PNG', `_${thumbSize}.PNG`)
      .replace('.jpeg', `_${thumbSize}.jpeg`).replace('.JPEG', `_${thumbSize}.JPEG`);
  }
  return newURL;
}

export { createThumbnail };