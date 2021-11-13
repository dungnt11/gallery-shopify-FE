import { createThumbnail } from '../helper/create-thumbnail';
import { effectLimit } from './limit';
import { effect1 } from './effect-1';
import { effect2 } from './effect-2';
import { effect3 } from './effect-3';
import { effect4 } from './effect-4';
import { effect5 } from './effect-5';
import { effect6 } from './effect-6';
import { effect7 } from './effect-7';
import { effect8 } from './effect-8';
import { effect9 } from './effect-9';
import { effect10 } from './effect-10';
import { effect11 } from './effect-11';
import { effect12 } from './effect-12';
import { effect13 } from './effect-13';
import { effect14 } from './effect-14';
import { effect15 } from './effect-15';
import { effect16 } from './effect-16';
import { effect17 } from './effect-17';
import { effect18 } from './effect-18';
import { effect19 } from './effect-19';
import { effect20 } from './effect-20';
import { effect21 } from './effect-21';
import { effect22 } from './effect-22';
import { effect23 } from './effect-23';
import { effect24 } from './effect-24';
import { effect25 } from './effect-25';
import { effect26 } from './effect-26';
import { effect27 } from './effect-27';
import { effect28 } from './effect-28';
import { effect29 } from './effect-29';
import { effect30 } from './effect-30';

function effectBase(image, galleryDB) {
	const { parallax } = galleryDB.gallery.settings;
	const { effect, src, alt } = image;
	const { type } = effect;
	const { enable } = parallax;

	const classImg = `e-gallery__image${enable ? ' parallax' : ''}`;
	const dataRate = enable ? 'data-rate="0.9"' : '';
	const imageDOM = `<img class="${classImg}" ${dataRate} alt="${alt}" data-src="${src}" src="${createThumbnail(src, '500x')}" />`;

	switch (type) {
		case 'effect1': {
			return effect1(effect, imageDOM);
		}

		case 'effect2': {
			return effect2(effect, imageDOM);
		}

		case 'effect3': {
			return effect3(effect, imageDOM);
		}

		case 'effect4': {
			return effect4(effect, imageDOM);
		}

		case 'effect5': {
			return effect5(effect, imageDOM);
		}

		case 'effect6': {
			return effect6(effect, imageDOM);
		}

		case 'effect7': {
			return effect7(effect, imageDOM);
		}

		case 'effect8': {
			return effect8(effect, imageDOM);
		}

		case 'effect9': {
			return effect9(effect, imageDOM);
		}

		case 'effect10': {
			return effect10(effect, imageDOM);
		}

		case 'effect11': {
			return effect11(effect, imageDOM);
		}

		case 'effect12': {
			return effect12(effect, imageDOM);
		}

		case 'effect13': {
			return effect13(effect, imageDOM);
		}

		case 'effect14': {
			return effect14(effect, imageDOM);
		}

		case 'effect15': {
			return effect15(effect, imageDOM);
		}

		case 'effect16': {
			return effect16(effect, imageDOM);
		}

		case 'effect17': {
			return effect17(effect, imageDOM);
		}

		case 'effect18': {
			return effect18(effect, imageDOM);
		}

		case 'effect19': {
			return effect19(effect, imageDOM);
		}

		case 'effect20': {
			return effect20(effect, imageDOM);
		}

		case 'effect21': {
			return effect21(effect, imageDOM);
		}

		case 'effect22': {
			return effect22(effect, imageDOM);
		}

		case 'effect23': {
			return effect23(effect, imageDOM);
		}

		case 'effect24': {
			return effect24(effect, imageDOM);
		}

		case 'effect25': {
			return effect25(effect, imageDOM);
		}

		case 'effect26': {
			return effect26(effect, imageDOM);
		}

		case 'effect27': {
			return effect27(effect, imageDOM);
		}

		case 'effect28': {
			return effect28(effect, imageDOM);
		}

		case 'effect29': {
			return effect29(effect, imageDOM);
		}

		case 'effect30': {
			return effect30(effect, imageDOM);
		}

		default: {

			break;
		}
	}
}

function effectLimitBase(image, galleryDB) {
	const { src, alt } = image;

	const { gallery, images } = galleryDB;
	const { parallax, limit } = gallery.settings;
	const { enable } = parallax;

	const classImg = `e-gallery__image${enable ? ' parallax' : ''}`;
	const dataRate = enable ? 'data-rate="2"' : '';
	const imageDOM = `<img class="${classImg}" ${dataRate} alt="${alt}" data-src="${src}" src="${createThumbnail(src, '500x')}" />`;

	const textLimit = limit.text.replace('{number}', images.length - limit.items);
	return effectLimit(imageDOM, textLimit);
}

export { effectBase, effectLimitBase };