import { getShop } from './get-shop';

/**
 * Lấy tên shop từ domain
 */
async function getJsonByShop(handleGallery) {
  const hostname = window.location.hostname;
  if (!hostname && process.env.NODE_ENV !== 'development') {return;}
  const shopName = getShop(hostname);
  const urlJSON = process.env.NODE_ENV === 'development' ? `${process.env.URL_JSON_GALLERY}?time=${Date.now()}` : `${process.env.URL_BASE}/${shopName}/${handleGallery}.json`;
  const resGallery = await fetch(urlJSON, {
    'headers': {
      'accept': '*/*',
      'accept-language': 'vi,en-US;q=0.9,en;q=0.8',
      'sec-ch-ua': '"Chromium";v="94", "Google Chrome";v="94", ";Not A Brand";v="99"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': '"macOS"',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'same-origin'
    },
    'referrerPolicy': 'no-referrer',
    'body': null,
    'method': 'GET',
    'mode': 'cors',
    'credentials': 'include'
  });

  const resGalleryPaser = await resGallery.json();
  return resGalleryPaser;
}

export { getJsonByShop };
