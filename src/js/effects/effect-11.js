/**
 * Generate effect - 10
 * @param effect
 * @param imageDOM -  image DOM
 */
function effect11(effect, imageDOM) {
	return `<figure class="effect-romeo e-image-item">
    ${imageDOM}
    <figcaption>
      <h2>${effect.title}</h2>
      <p>${effect.description}</p>
    </figcaption>			
  </figure>`;
}

export { effect11 };
