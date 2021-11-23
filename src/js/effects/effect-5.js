/**
 * Generate effect - 5
 * @param effect
 * @param imageDOM -  image DOM
 */
function effect5(effect, imageDOM) {
	return `<figure class="effect-zoe e-image-item">
    ${imageDOM}
    <figcaption>
      <h2>${effect.title}</h2>
      <p>${effect.description}</p>
    </figcaption>
  </figure>`;
}

export { effect5 };
