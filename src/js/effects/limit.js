function effectLimit(imageDOM, text) {
  return `<figure class="e-image-item effect-limit">
    ${imageDOM}
    <figcaption>
      <p>${text}</p>
    </figcaption>
  </figure>`;
}

export { effectLimit };
