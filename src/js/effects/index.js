import { effectLimit } from './limit';
import { getThumbnailSrcImage } from '../helper/thumbnail-src-image';
import { EFFECTS_DEFINED } from './defined';

function effectBase(image, galleryDB) {
	const {
		scrollAnimation,
		typeFilter, isEnableFilter,
		loadmore,
	 } = galleryDB.gallery.settings;
	let forceShowSrc = scrollAnimation.enable;
	if (isEnableFilter && (typeFilter === 'limit' || typeFilter === 'loadmore')) forceShowSrc = false;
	if (isEnableFilter && typeFilter === 'loadmore' && loadmore.typeLoad === 'infinity-scroll') forceShowSrc = true;
	const { effect, src, alt } = image;

	const imageDOM = `<img class="e-gallery__image" alt="${alt}" ${forceShowSrc ? "" : "data-"}src="${getThumbnailSrcImage(src, galleryDB.gallery.settings)}" />`;
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
		limit, scrollAnimation,
		typeFilter, isEnableFilter,
	} = gallery.settings;

	let forceShowSrc = scrollAnimation.enable;
	if (typeFilter === 'limit' && isEnableFilter) forceShowSrc = false;
	const imageDOM = `<img class="e-gallery__image" alt="${alt}" ${forceShowSrc ? "" : "data-"}src="${getThumbnailSrcImage(src, galleryDB.gallery.settings)}" />`;

	const textLimit = limit.text.replace('{number}', images.length - limit.items);
	return effectLimit(imageDOM, textLimit, prevClass);
}

export { effectBase, effectLimitBase };