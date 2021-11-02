/**
 * Generate effect - 3
 * @param effect
 * @param imageDOM -  image DOM
 */
function effect3(effect, imageDOM) {
	return `<figure class="effect-honey e-image-item">
    ${imageDOM}
    <figcaption>
      <h2>${effect.title}</h2>
    </figcaption>			
  </figure>`;
}

export { effect3 };
