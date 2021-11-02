/**
 * Generate effect - 4
 * @param effect
 * @param imageDOM -  image DOM
 */
function effect4(effect, imageDOM) {
	return `<figure class="effect-layla e-image-item">
    ${imageDOM}
    <figcaption>
      <h2>${effect.title}</h2>
      <p>${effect.description}</p>
    </figcaption>			
  </figure>`;
}

export { effect4 };
