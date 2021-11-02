/**
 * Generate effect - 6
 * @param effect
 * @param imageDOM -  image DOM
 */
function effect6(effect, imageDOM) {
	return `<figure class="effect-oscar e-image-item">
    ${imageDOM}
    <figcaption>
      <h2>${effect.title}</h2>
      <p>${effect.description}</p>
    </figcaption>			
  </figure>`;
}

export { effect6 };
