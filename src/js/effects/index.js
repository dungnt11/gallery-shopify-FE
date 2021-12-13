import { effectLimit } from './limit';
import { getThumbnailSrcImage } from '../helper/thumbnail-src-image';
import { EFFECTS_DEFINED } from './defined';

function effectBase(image, galleryDB) {
	const {
		parallax, scrollAnimation,
		typeFilter, isEnableFilter,
	 } = galleryDB.gallery.settings;
	let forceShowSrc = scrollAnimation.enable;
	if (typeFilter === 'limit' && isEnableFilter) forceShowSrc = false;
	const { effect, src, alt } = image;

	const classImg = `e-gallery__image${parallax.enable ? ' parallax' : ''}`;
	const dataRate = parallax.enable ? 'data-rate="0.9"' : '';

	const imageDOM = `<img class="${classImg}" ${dataRate} alt="${alt}" ${forceShowSrc ? "" : "data-"}src="${getThumbnailSrcImage(src)}" />`;
	const effectView = effect.isCustom ? image.effect : galleryDB.gallery.effect;
	/**
	 * Mọi thứ đang ăn theo effect tổng
	 * nếu sau này ăn theo từng effect con sẽ cần xử lý lại đoạn này
	 */
	const effType = +galleryDB.gallery.effect.type.replace('effect', '') - 1;
	return `<figure class="effect-${EFFECTS_DEFINED[effType]} e-image-item">
		${imageDOM}
		<figcaption>
			<h2>${effectView.title}</h2>
			<p>${effectView.description}</p>
		</figcaption>
	</figure>`
}

function effectLimitBase(image, galleryDB, prevClass) {
	const { src, alt } = image;

	const { gallery, images } = galleryDB;
	const {
		parallax, limit, scrollAnimation,
		typeFilter, isEnableFilter,
	} = gallery.settings;

	let forceShowSrc = scrollAnimation.enable;
	if (typeFilter === 'limit' && isEnableFilter) forceShowSrc = false;
	const classImg = parallax.enable ? ' parallax' : '';
	const dataRate = scrollAnimation.enable ? 'data-rate="2"' : '';
	const imageDOM = `<img class="${classImg}" ${dataRate} alt="${alt}" ${forceShowSrc ? "" : "data-"}src="${getThumbnailSrcImage(src)}" />`;

	const textLimit = limit.text.replace('{number}', images.length - limit.items);
	return effectLimit(imageDOM, textLimit, prevClass);
}

export { effectBase, effectLimitBase };