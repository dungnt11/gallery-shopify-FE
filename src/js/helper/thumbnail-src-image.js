import { createThumbnail } from './create-thumbnail';
import { settingsGallery } from '../store/settings';

function getThumbnailSrcImage(src, gallerySettings) {
  const settings = settingsGallery.settings;

	const { parallax } = gallerySettings;

	let srcThumbnail = src;
	if (JSON.stringify(srcThumbnail) !== '{}') {
		if (settings.enableOptimizeImage) {
			if (parallax.enable) {
				srcThumbnail = createThumbnail(src, `${settings.maxWidthImage * +(parallax.scale.replace(',', '.') || 1.2)}x`);
			} else {
				srcThumbnail = createThumbnail(src, `${settings.maxWidthImage}x`);
			}
		}
	}

  return srcThumbnail;
}

export { getThumbnailSrcImage };
