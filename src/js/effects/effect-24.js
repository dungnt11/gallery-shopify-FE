/**
 * Generate effect - 24
 * @param effect
 * @param imageDOM -  image DOM
 */
function effect24(effect, imageDOM) {
	return `<figure class="effect-kira e-image-item">
    ${imageDOM}
    <figcaption>
      <h2>${effect.title}</h2>
      <p>${effect.description}</p>
    </figcaption>			
  </figure>`;
}

export { effect24 };
