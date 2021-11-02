/**
 * Generate effect - 14
 * @param effect
 * @param imageDOM -  image DOM
 */
function effect14(effect, imageDOM) {
	return `<figure class="effect-chico e-image-item">
    ${imageDOM}
    <figcaption>
      <h2>${effect.title}</h2>
      <p>${effect.description}</p>
    </figcaption>			
  </figure>`;
}

export { effect14 };
