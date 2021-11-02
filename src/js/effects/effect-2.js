/**
 * Generate effect - 2
 * @param effect
 * @param imageDOM -  image DOM
 */
function effect2(effect, imageDOM) {
	return `<figure class="effect-sadie e-image-item">
    ${imageDOM}
    <figcaption>
      <h2>${effect.title}</h2>
      <p>${effect.description}</p>
    </figcaption>			
  </figure>`;
}

export { effect2 };
