/**
 * Generate effect - 5
 * @param effect
 * @param imageDOM -  image DOM
 */
function effect5(effect, imageDOM) {
	return `<figure class="effect-zoe e-image-item">
    ${imageDOM}
    <p class="description">${effect.description}</p>
    <figcaption>
      <h2>${effect.title}</h2>
    </figcaption>
  </figure>`;
}

export { effect5 };
