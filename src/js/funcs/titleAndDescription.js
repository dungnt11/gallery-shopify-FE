function titleAndDescriptionFnc(blockDOM, gallerySettings) {
  const dataIDGallery = blockDOM.getAttribute('data-id');
  if (!dataIDGallery) return;
  if (document.querySelector(`.e-gallery__heading[data-id="${dataIDGallery}"]`)) return;
  const { title, description, positionTitle } = gallerySettings;
  const DOMTitleAndDes = `<div class="e-gallery__heading ${positionTitle}" data-id="${dataIDGallery}">
      <div class="e-gallery__heading--title">${title}</div>
      <div class="e-gallery__heading--description">${description}</div>
    </div>`;
    blockDOM.insertAdjacentHTML('beforebegin', DOMTitleAndDes);
}

export { titleAndDescriptionFnc };