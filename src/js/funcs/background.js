import { getGradientPreview } from '../helper/get-gradient';

function buildBackgroundFn(galleryHandle, backgroundSettings) {
  const { type, solid, gradient, image, animationGradient } = backgroundSettings;

  let bg = '';
  switch(type) {
    case 'solid':
      bg = solid.color;
      break;
    case 'gradient':
      bg = getGradientPreview(gradient.gradient, gradient.angle).background;
      break;
    case 'image':
      bg = `url(${image}) no-repeat center center;background-size:cover`;
      break;
    default:
      break;
  }

  return `
    e-gallery-widget[data-id="${galleryHandle}"] {
      ${bg ? `background: ${bg};` : ''}
      ${animationGradient ? `
      background-size: 400% 400% !important;
      animation: e-gallery-gradient 15s ease infinite;
      ` : ''}
    }
  `;
}

export { buildBackgroundFn };
