/**
 * Generate effect - 23
 * @param effect
 * @param imageDOM -  image DOM
 */
function effect23(effect, imageDOM) {
	return `<figure class="effect-apollo e-image-item">
    ${imageDOM}
    <figcaption>
      <h2>${effect.title}</h2>
      <p>${effect.description}</p>
    </figcaption>			
  </figure>`;
}

export { effect23 };
