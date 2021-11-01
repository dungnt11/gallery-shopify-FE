import { effect1 } from './effect-1';
import { effect2 } from './effect-2';

function effectBase(image, parallax) {
	const { effect, src, alt } = image;
	const { type } = effect;
	const { enable } = parallax;

	const imageDOM = `<img class="e-gallery__image${enable ? ' parallax' : ''}" 
							${enable ? 'data-rate="0.3"' : ''}  
							alt="${alt}" src="${src}" />`;

	switch (type) {
		case 'effect1': {
			return effect1(effect, imageDOM);
		}

		case 'effect2': {
			return effect2(effect, imageDOM);
		}

		default: {

			break;
		}
	}
}

export { effectBase };