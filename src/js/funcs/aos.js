import AOS from 'aos';

class AosBase {
	constructor() {
		this.aos = AOS.init({ startEvent: 'DOMContentLoaded' });
	}
}

// Hiệu ứng cuộn trang cho gallery
function aosDOMFnc(scrollSettings) {
	const {
		enable,
		animation,
		anchorPlacements,
		easingFunctions,
	} = scrollSettings;
	if (!enable) return '';
	// galleryDOM - DOM gallery tổng
	return `data-aos-offset=120
	data-aos-delay=50
	data-aos-duration=300
	data-aos-once=true
	data-aos=${animation || 'zoom-in'}
	data-aos-easing=${easingFunctions || 'ease-in-out'}
	data-aos-anchor-placement=${anchorPlacements || 'top-center'}`;
}

export { aosDOMFnc, AosBase };