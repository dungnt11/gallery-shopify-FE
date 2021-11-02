/**
 * Generate effect - 21
 * @param effect
 * @param imageDOM -  image DOM
 */
function effect21(effect, imageDOM) {
	return `<figure class="effect-terry e-image-item">
    ${imageDOM}
    <figcaption>
      <h2>${effect.title}</h2>
      <p>${effect.description}</p>
    </figcaption>			
  </figure>`;
}

export { effect21 };
