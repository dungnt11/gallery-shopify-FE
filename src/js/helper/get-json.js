import { getShop } from './get-shop';

async function getJsonByShop(handleGallery) {
  const hostname = window.location.hostname;
  if (!hostname && process.env.NODE_ENV !== 'development') {return;}
  const shopName = getShop(hostname);
  let urlJSON = `${process.env.URL_GALLERY_APP}/${shopName}/${handleGallery}.json`;
  if (!window.location.search.includes('?preview=true&gallery=') && window.location.search.includes('.json')) {
    alert(`URL preview phải có dạng ${process.env.URL_GALLERY_APP}/?preview=true&gallery=doremon-shop/handle_gallery.json`);
  } else {
    urlJSON = `${process.env.URL_GALLERY_APP}/${window.location.search.replace('?preview=true&gallery=', '')}?time=${Date.now()}`;
  }
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
  const resGalleryParser = await resGallery.json();
  return resGalleryParser;
}

export { getJsonByShop };
