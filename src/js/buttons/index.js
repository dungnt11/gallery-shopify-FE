function btn1(id, isLoading, colorClass) {
  return `<button
  id="${id}"
  class="e-btn${isLoading ? " loading-start" : ""}${colorClass}"
  data="left-loading"
>
  <svg class="animated fadeInRight" version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="24px" height="24px" viewBox="0 0 50 50" xmlSpace="preserve">
    <path fill="#000" d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z">
      <animateTransform attributeType="xml" attributeName="transform" type="rotate" from="0 25 25" to="360 25 25" dur="0.6s" repeatCount="indefinite" />
    </path>
  </svg>
  <span class="text">${ isLoading ? 'Loading' : 'Load more' }</span>
</button>`;
}

function btn2(id, isLoading, colorClass) {
  return `<button
  id="${id}"
  class="e-btn${isLoading ? " loading-start" : ""}${colorClass}"
  data="bottom-loading"
>
  <span>Load more</span>
  <div class="progress${isLoading ? " progress-active" : ""}">
    <div class="indeterminate" />
  </div>
</button>`;
}

export { btn1, btn2 };
