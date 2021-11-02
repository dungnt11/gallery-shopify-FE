/**
 * Generate effect - 13
 * @param effect
 * @param imageDOM -  image DOM
 */
function effect13(effect, imageDOM) {
	return `<figure class="effect-sarah e-image-item">
    ${imageDOM}
    <figcaption>
      <h2>${effect.title}</h2>
      <p>${effect.description}</p>
    </figcaption>			
  </figure>`;
}

export { effect13 };
