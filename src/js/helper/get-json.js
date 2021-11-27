import { getShop } from './get-shop';
import { settingsGallery } from '../store/settings';

async function getJsonByShop(handleGallery) {
  const hostname = window.location.hostname;
  if (!hostname && process.env.NODE_ENV !== 'development') {return;}
  const shopName = getShop(hostname);
  let urlJSON = `${process.env.URL_GALLERY_APP}/${shopName}/${handleGallery}.json?t=${Date.now()}`;
  if (window.location.search.includes('?preview=true&gallery=') && window.location.search.includes('.json')) {
    document.body.classList.add('font-active');
    urlJSON = `${process.env.URL_GALLERY_APP}/${window.location.search.replace('?preview=true&gallery=', '')}?t=${Date.now()}`;
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
  if (window.location.search.includes('?preview=true&gallery=') && window.location.search.includes('.json')) {
    const regex = /&gallery=(.*?)\//gm;
    shopName = regex.exec(window.location.search)[1];
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
