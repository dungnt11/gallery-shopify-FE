/**
 * Generate effect - 19
 * @param effect
 * @param imageDOM -  image DOM
 */
function effect19(effect, imageDOM) {
	return `<figure class="effect-winston e-image-item">
    ${imageDOM}
    <figcaption>
      <h2>${effect.title}</h2>
      <p>${effect.description}</p>
    </figcaption>			
  </figure>`;
}

export { effect19 };
