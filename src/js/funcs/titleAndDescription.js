function titleAndDescriptionFnc(blockDOM, gallerySettings) {
  const dataIDGallery = blockDOM.getAttribute('data-id');
  if (!dataIDGallery) return;
  if (document.querySelector(`.e-gallery__heading[data-id="${dataIDGallery}"]`)) return;
  const { title, description, positionTitle } = gallerySettings;
  const DOMTitleAndDes = `<div class="e-gallery__heading e-gallery-spacing-bottom ${positionTitle}" data-id="${dataIDGallery}">
      ${title}
      ${description}
    </div>`;
    blockDOM.insertAdjacentHTML('beforebegin', DOMTitleAndDes);
}

export { titleAndDescriptionFnc };