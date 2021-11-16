function effectLimit(imageDOM, text, customClass) {
  return `<figure class="effect-limit${customClass}">
    ${imageDOM}
    <figcaption>
      <p>${text}</p>
    </figcaption>
  </figure>`;
}

export { effectLimit };
