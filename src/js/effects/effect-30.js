/**
 * Generate effect - 29
 * @param effect
 * @param imageDOM -  image DOM
 */
function effect30(effect, imageDOM) {
	return `<figure class="effect-duke e-image-item">
  ${imageDOM}
    <figcaption>
      <h2>${effect.title}</h2>
      <p>${effect.description}</p>
    </figcaption>			
  </figure>`;
}

export { effect30 };
