/**
 * Generate effect - 9
 * @param effect
 * @param imageDOM -  image DOM
 */
function effect9(effect, imageDOM) {
	return `<figure class="effect-roxy e-image-item">
    ${imageDOM}
    <figcaption>
      <h2>${effect.title}</h2>
      <p>${effect.description}</p>
    </figcaption>			
  </figure>`;
}

export { effect9 };
