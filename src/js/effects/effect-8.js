/**
 * Generate effect - 8
 * @param effect
 * @param imageDOM -  image DOM
 */
function effect8(effect, imageDOM) {
	return `<figure class="effect-ruby e-image-item">
  ${imageDOM}
    <figcaption>
      <h2>${effect.title}</h2>
      <p>${effect.description}</p>
    </figcaption>			
  </figure>`;
}

export { effect8 };
