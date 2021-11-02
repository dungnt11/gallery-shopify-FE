/**
 * Generate effect - 20
 * @param effect
 * @param imageDOM -  image DOM
 */
function effect20(effect, imageDOM) {
	return `<figure class="effect-selena e-image-item">
    ${imageDOM}
    <figcaption>
      <h2>${effect.title}</h2>
      <p>${effect.description}</p>
    </figcaption>			
  </figure>`;
}

export { effect20 };
