import FontFaceObserver from "fontfaceobserver";

export const loadFonts = (name: string, url: string, onLoaded?: () => void) => {
  const link = document.createElement("link");
  link.href = url;
  link.rel = "stylesheet";

  document.head.appendChild(link);

  const font = new FontFaceObserver(name);

  font
    .load()
    .then(() => {
      console.log(`[FONT] ${name} - Loaded!`);
      document.documentElement.classList.add(
        name.toUpperCase().replace(/ /g, "-"),
      );
      onLoaded && onLoaded();
    })
    .catch(() => {
      console.error(new Error(`[FONT] ${name} - Load failed!`));
    });
};
