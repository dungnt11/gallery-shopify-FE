/**
 * Generate effect - 1
 * @param effect
 * @param imageDOM -  image DOM
 */
function effect1(effect, imageDOM) {
	return `<figure class="effect-lily e-image-item">
    ${imageDOM}
    <figcaption>
      <div>
        <h2>${effect.title}</h2>
        <p>${effect.description}</p>
      </div>
    </figcaption>
  </figure>`;
}

export { effect1 };
