/**
 * Generate effect - 16
 * @param effect
 * @param imageDOM -  image DOM
 */
function effect16(effect, imageDOM) {
	return `<figure class="effect-julia e-image-item">
    ${imageDOM}
    <figcaption>
      <h2>${effect.title}</h2>
      <p class="bg-inherit">${effect.description}</p>
    </figcaption>			
  </figure>`;
}

export { effect16 };
