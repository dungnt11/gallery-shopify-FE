/**
 * Generate effect - 18
 * @param effect
 * @param imageDOM -  image DOM
 */
function effect18(effect, imageDOM) {
	return `<figure class="effect-hera e-image-item">
    ${imageDOM}
    <figcaption>
      <h2>${effect.title}</h2>
      <p>${effect.description}</p>
    </figcaption>			
  </figure>`;
}

export { effect18 };
