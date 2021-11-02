/**
 * Generate effect - 17
 * @param effect
 * @param imageDOM -  image DOM
 */
function effect17(effect, imageDOM) {
	return `<figure class="effect-goliath e-image-item">
    ${imageDOM}
    <figcaption>
      <h2>${effect.title}</h2>
      <p>${effect.description}</p>
    </figcaption>			
  </figure>`;
}

export { effect17 };
