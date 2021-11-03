/**
 * Generate effect - 15
 * @param effect
 * @param imageDOM -  image DOM
 */
function effect15(effect, imageDOM) {
	return `<figure class="effect-milo e-image-item">
    ${imageDOM}
    <figcaption>
      <h2>${effect.title}</h2>
      <p>${effect.description}</p>
    </figcaption>			
  </figure>`;
}

export { effect15 };
