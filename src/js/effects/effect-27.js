/**
 * Generate effect - 27
 * @param effect
 * @param imageDOM -  image DOM
 */
function effect27(effect, imageDOM) {
	return `<figure class="effect-jazz e-image-item">
    ${imageDOM}
    <figcaption>
      <h2>${effect.title}</h2>
      <p>${effect.description}</p>
    </figcaption>			
  </figure>`;
}

export { effect27 };
