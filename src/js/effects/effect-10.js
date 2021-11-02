/**
 * Generate effect - 10
 * @param effect
 * @param imageDOM -  image DOM
 */
function effect10(effect, imageDOM) {
	return `<figure class="10 effect-bubba e-image-item">
    ${imageDOM}
    <figcaption>
      <h2>${effect.title}</h2>
      <p>${effect.description}</p>
    </figcaption>			
  </figure>`;
}

export { effect10 };
