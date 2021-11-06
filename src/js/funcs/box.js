function boxFn(galleryHandle, boxSettings) {
  return `
    e-gallery-widget[data-id="${galleryHandle}"] .e-image-item {
      border-radius: ${boxSettings.radiusImage}px;
    }
    e-gallery-widget[data-id="${galleryHandle}"] {
      border: ${boxSettings.width}px ${boxSettings.style} ${boxSettings.color.color};
      border-radius: ${boxSettings.radius}px;
    }
  `;
}

export { boxFn };