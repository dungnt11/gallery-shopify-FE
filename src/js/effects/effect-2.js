/**
 * Generate effect - 2
 * @param effect
 * @param imageDOM -  image DOM
 */
function effect2(effect, imageDOM) {
	return `<figure class="effect-sadie">
    ${imageDOM}
    <figcaption>
      <h2>Holy <span>Sadie</span></h2>
      <p>${effect.description}</p>
    </figcaption>			
  </figure>`;
}

export { effect2 };
