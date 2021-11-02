/**
 * Generate effect - 7
 * @param effect
 * @param imageDOM -  image DOM
 */
function effect7(effect, imageDOM) {
	return `<figure class="effect-marley e-image-item">
    ${imageDOM}
    <figcaption>
      <h2>${effect.title}</h2>
      <p>${effect.description}</p>
    </figcaption>			
  </figure>`;
}

export { effect7 };
