// https://nicolas-cusan.github.io/breakpoint-helper/
import breakpointHelper from 'breakpoint-helper';
import { sortLayout } from '../helper/sortLayout';
import { limitFn } from '../funcs/limit';
import { loadmoreFn } from '../funcs/loadmore';
import { filterFn } from '../funcs/filter';

const instance = breakpointHelper({
  xs: '416px',
  sm: '600px',
  md: '768px',
  lg: '992px',
  xl: '1200px',
});

function registerDisplay(galleryDOMArg, galleryDB) {
  instance.listenAll((bps) => {
    let displayActive = bps[0];
    if (!displayActive) displayActive = 'xs';
    const blockSorted = sortLayout(galleryDB.images, displayActive);
    limitFn(galleryDOMArg, galleryDB, blockSorted);
    loadmoreFn(galleryDOMArg, galleryDB, blockSorted, displayActive);
    filterFn(galleryDOMArg, galleryDB);
  });
}

export { registerDisplay };