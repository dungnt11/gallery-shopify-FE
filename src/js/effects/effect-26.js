/**
 * Generate effect - 26
 * @param effect
 * @param imageDOM -  image DOM
 */
function effect26(effect, imageDOM) {
	return `<figure class="effect-moses e-image-item">
    ${imageDOM}
    <figcaption>
      <h2>${effect.title}</h2>
      <p>${effect.description}</p>
    </figcaption>			
  </figure>`;
}

export { effect26 };
