import { effect1 } from './effect-1';
import { effect2 } from './effect-2';

function effectBase(image) {
	const { effect, src, alt } = image;
	const { type } = effect;

	const imageDOM = `<img class="e-gallery__image" alt="${alt}" src="${src}" />`;

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
