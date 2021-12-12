import { getShop } from './get-shop';
import { settingsGallery } from '../store/settings';

async function getJsonByShop(handleGallery) {
  const hostname = window.location.hostname;
  if (!hostname && process.env.NODE_ENV !== 'development') {return;}
  const shopName = getShop(hostname);
  let urlJSON = `${process.env.URL_GALLERY_APP}/${shopName}/${handleGallery}.json?t=${Date.now()}`;
  const locationSearchDecode = decodeURIComponent(window.location.search);
  
  if (locationSearchDecode.includes('?preview=true&gallery=') && locationSearchDecode.includes('.json')) {
    document.body.classList.add('e-gallery-preview');
    urlJSON = `${process.env.URL_GALLERY_APP}/${locationSearchDecode.replace('?preview=true&gallery=', '')}?t=${Date.now()}`;
    settingsGallery.setConfig({ isPreviewMode: true });
  }
  const resGallery = await fetch(urlJSON, {
    'method': 'GET',
  });
  if (!resGallery.ok) throw new Error('Fetch gallery error!');
  const resGalleryParser = await resGallery.json();
  return resGalleryParser;
}

async function getJsonSettings() {
  const hostname = window.location.hostname;
  if (!hostname && process.env.NODE_ENV !== 'development') {return;}
  let shopName = getShop(hostname);
  const locationSearchDecode = decodeURIComponent(window.location.search);
  if (locationSearchDecode.includes('?preview=true&gallery=') && locationSearchDecode.includes('.json')) {
    const regex = /&gallery=(.*?)\//gm;
    const shopNameRegex = regex.exec(locationSearchDecode);
    if (shopNameRegex) {
      shopName = shopNameRegex[1];
    }
  }
  const urlJSON = `${process.env.URL_GALLERY_APP}/settings/${shopName}.json?t=${Date.now()}`;
  try {
    const resSettingsGallery = await fetch(urlJSON, {
      'method': 'GET',
    });
    if (!resSettingsGallery.ok) return;
    const settingsGalleryPaser = await resSettingsGallery.json();
    settingsGallery.updateSettings(settingsGalleryPaser);
  } catch (error) {
    console.error(error);
  }
}

export { getJsonByShop, getJsonSettings };
