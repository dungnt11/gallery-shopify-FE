/**
 * Hàm này sẽ sort gallery sao cho vị trí hiển thị trùng với vị trí trong mảng
 * Ví dụ: [x] * 12 ->
 *  [x] [x] [x] [x]
 *  [x] [x] [x] [x]
 *  [x] [x] [x] [x]
 * 
 * Từ dưới -> trên và trái -> phải
 */

function sortLayout(images, displayActive) {
  // Init image x=0; y=0;
  const indFirstImage = images.findIndex((image) => !image.layout[displayActive].x && !image.layout[displayActive].y);
  const imageSortStore = [images[indFirstImage]];
  // Y tăng dần
  let maxY = [];
  images.forEach((image) => {
    if (!image.layout[displayActive].x) maxY.push(image.layout[displayActive].y);
  });
  // Sort lại
  maxY = maxY.sort((a, b) => a - b);
  let imagesCloned = JSON.parse(JSON.stringify(images.slice(0, indFirstImage).concat(images.slice(indFirstImage + 1))));
  while (imageSortStore.length !== images.length) {
    const lastImageStore = imageSortStore[imageSortStore.length - 1].layout[displayActive];

    if (lastImageStore.x + lastImageStore.w === 12) {
      maxY.shift();
    }
    const imagePushed = imagesCloned.find((image) => {
      if (lastImageStore.x + lastImageStore.w === 12) {
        return image.layout[displayActive].x === 0 && image.layout[displayActive].y === maxY[0];
      } else {
        return image.layout[displayActive].x === lastImageStore.x + lastImageStore.w;
      }
    });

    imageSortStore.push(imagePushed);
    imagesCloned = imagesCloned.filter((img) => img.id !== imagePushed.id);
  }
  return imageSortStore;
}

export { sortLayout };