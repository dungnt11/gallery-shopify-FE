/**
 * Generate effect - 25
 * @param effect
 * @param imageDOM -  image DOM
 */
function effect25(effect, imageDOM) {
	return `<figure class="effect-steve e-image-item">
    ${imageDOM}
    <figcaption>
      <h2>${effect.title}</h2>
      <p>${effect.description}</p>
    </figcaption>			
  </figure>`;
}

export { effect25 };
