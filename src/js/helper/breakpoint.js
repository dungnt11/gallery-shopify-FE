// https://nicolas-cusan.github.io/breakpoint-helper/
import breakpointHelper from 'breakpoint-helper';
import { limitFn } from '../funcs/limit';

const instance = breakpointHelper({
  xs: '416px',
  sm: '600px',
  md: '768px',
  lg: '992px',
  xl: '1200px',
});

function registerDisplay(galleryDOMArg, galleryDB) {
  instance.listenAll((bps) => {
    const match = bps[0];
    limitFn(galleryDOMArg, galleryDB, match);  
  });
}

export { registerDisplay };