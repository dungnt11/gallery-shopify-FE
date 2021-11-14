import { createThumbnail } from './create-thumbnail';
import { settingsGallery } from '../store/settings';

function getThumbnailSrcImage(src) {
  const settings = settingsGallery.settings;
	let srcThumbnail = src;
	if (JSON.stringify(srcThumbnail) !== '{}') {
		if (settings.enableOptimizeImage) {
			srcThumbnail = createThumbnail(src, `${settings.maxWidthImage}x`);
		}
	}

  return srcThumbnail;
}

export { getThumbnailSrcImage };
