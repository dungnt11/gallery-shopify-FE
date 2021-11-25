import { LOADING_SVG } from '../constant';
import { getJsonByShop } from '../helper/get-json';
// Build loading for gallery
async function loadingFn(galleryDOMArg) {
  try {
    const galleryHandle = galleryDOMArg.getAttribute('data-id');
    galleryDOMArg.innerHTML = LOADING_SVG;
    const galleryDB = await getJsonByShop(galleryHandle);
    return [galleryHandle, galleryDB];
  } catch (error) {
    console.error(error);
  } finally {
    galleryDOMArg.innerHTML = '';
  }
}

export { loadingFn };