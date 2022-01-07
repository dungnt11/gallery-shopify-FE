import { effectLimit } from './limit';
import { getThumbnailSrcImage } from '../helper/thumbnail-src-image';
import { EFFECTS_DEFINED, EFFECT_NORMAL } from './defined';

// Nếu overlay rỗng thì sẽ có thêm lớp xanh cho giống app
const sketBackground = '<div style="width: 100%;height: 100%; background: rgb(86, 161, 147) none repeat scroll 0% 0%; z-index: 1;"></div>';

function effectBase(image, galleryDB) {
	const {
		scrollAnimation,
		typeFilter, isEnableFilter,
		loadmore,
	 } = galleryDB.gallery.settings;
	let forceShowSrc = scrollAnimation.enable;
	if (isEnableFilter && (typeFilter === 'limit' || typeFilter === 'loadmore')) forceShowSrc = false;
	if (isEnableFilter && typeFilter === 'filter') forceShowSrc = true;
	if (isEnableFilter && typeFilter === 'loadmore' && loadmore.typeLoad === 'infinity-scroll') forceShowSrc = true;
	const { effect, src, alt } = image;

	const imageDOM = src ? `<img class="e-gallery__image" alt="${alt}" ${forceShowSrc ? "" : "data-"}src="${getThumbnailSrcImage(src, galleryDB.gallery.settings)}" />` : sketBackground;
	const effectView = effect.isCustom ? image.effect : galleryDB.gallery.effect;

	const effectType = galleryDB.gallery.selectOverlayType;
	const indEffectSelect = galleryDB.gallery.effectSelect;
	let customStyle = '';
	let customElementInBlock = 'style="text-align: center"';
	// Position element
	if (effectType === 0) {
		const { positionHorizontal, positionVertical } = effect;
		let justifyContent = "center";

		switch (positionVertical) {
			case "Top":
				justifyContent = "flex-start";
				break;
			case "Bottom":
				justifyContent = "flex-end";
				break;
	
			default:
				break;
		}

		customElementInBlock = `style="text-align: ${positionHorizontal.toLowerCase()}"`;

		customStyle = `style="display: flex; flex-direction: column; justify-content: ${justifyContent}"`;
	}
	 
	return `<figure class="${effectType === 0 ? EFFECT_NORMAL[indEffectSelect - 1] : `effect-${EFFECTS_DEFINED[indEffectSelect - 1]}`} e-image-item">
		${imageDOM}
		<figcaption ${customStyle}>
			<h2 ${customElementInBlock}>${effectView.title}</h2>
			<p ${customElementInBlock}>${effectView.description}</p>
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
	const imageDOM = src ? `<img class="e-gallery__image" alt="${alt}" ${forceShowSrc ? "" : "data-"}src="${getThumbnailSrcImage(src, galleryDB.gallery.settings)}" />` : sketBackground;

	const textLimit = limit.text.replace('{number}', images.length - limit.items);
	return effectLimit(imageDOM, textLimit, prevClass);
}

export { effectBase, effectLimitBase };