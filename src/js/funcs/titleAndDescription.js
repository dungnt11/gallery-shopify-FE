function titleAndDescriptionFnc(blockDOM, gallerySettings) {
  const { title, description, positionTitle } = gallerySettings;
  const DOMTitleAndDes = `<div class="e-gallery__heading ${positionTitle}">
      <div class="e-gallery__heading--title">${title}</div>
      <div class="e-gallery__heading--description">${description}</div>
    </div>`;
    blockDOM.insertAdjacentHTML('beforebegin', DOMTitleAndDes);
}

export { titleAndDescriptionFnc };