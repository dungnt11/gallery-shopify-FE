/**
 * Generate effect - 28
 * @param effect
 * @param imageDOM -  image DOM
 */
function effect28(effect, imageDOM) {
	return `<figure class="effect-ming e-image-item">
    ${imageDOM}
    <figcaption>
      <h2>${effect.title}</h2>
      <p>${effect.description}</p>
    </figcaption>			
  </figure>`;
}

export { effect28 };
