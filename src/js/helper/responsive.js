const SM =  '576px';
const MD =  '768px';
const LG =  '992px';
const XL =  '1200px';

function genResponsiveCode(display, cssChild) {
  switch (display) {
    case 'xl': {
      return ` @media only screen and (min-width: ${XL}) {
        ${cssChild}
      }\n`;
    }

    case 'lg': {
      return ` @media only screen and (min-width: ${LG}) {
        ${cssChild}
      }\n`;
    }

    case 'md': {
      return ` @media only screen and (min-width: ${MD}) {
        ${cssChild}
      }\n`;
    }

    case 'sm': {
      return ` @media only screen and (min-width: ${SM}) {
        ${cssChild}
      }\n`;
    }

    default: {
      return cssChild;
    }
  }
}

export { genResponsiveCode };
