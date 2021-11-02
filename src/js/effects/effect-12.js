/**
 * Generate effect - 12
 * @param effect
 * @param imageDOM -  image DOM
 */
function effect12(effect, imageDOM) {
	return `<figure class="12 effect-dexter e-image-item">
    ${imageDOM}
    <figcaption>
      <h2>${effect.title}</h2>
      <p>${effect.description}</p>
    </figcaption>			
  </figure>`;
}

export { effect12 };
