function effectLimit(imageDOM, text) {
  return `<figure class="e-image-item effect-limit">
    ${imageDOM}
    <figcaption>
      <div>
        <p>${text}</p>
      </div>
    </figcaption>
  </figure>`;
}

export { effectLimit };
