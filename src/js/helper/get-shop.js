/**
 * Chuyển từ doremon-shop.myshopify.com sang doremon-shop
 */
function getShop(shop) {
  return typeof shop === 'string' ? shop.replace('.myshopify.com', '') : '';
}

export { getShop };