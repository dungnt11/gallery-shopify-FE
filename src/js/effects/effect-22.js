/**
 * Generate effect - 22
 * @param effect
 * @param imageDOM -  image DOM
 */
function effect22(effect, imageDOM) {
	return `<figure class="effect-phoebe e-image-item">
    ${imageDOM}
    <figcaption>
      <h2>${effect.title}</h2>
      <p>${effect.description}</p>
    </figcaption>			
  </figure>`;
}

export { effect22 };
