function sortLayout(images, displayActive) {
  const layourSorted = images.sort((prev, curr) => {
    if (((prev.layout[displayActive].y) / (prev.layout[displayActive].h)) === ((curr.layout[displayActive].y) / (curr.layout[displayActive].h))) {
      return (prev.layout[displayActive].x / prev.layout[displayActive].w) - (curr.layout[displayActive].x / curr.layout[displayActive].w);
    }

    return ((prev.layout[displayActive].y) / (prev.layout[displayActive].h)) - ((curr.layout[displayActive].y) / (curr.layout[displayActive].h));
  });

  return layourSorted;
}

export { sortLayout };