export const readFile = (
  file: File | undefined,
  handleProgress?: (progress: number) => void,
): Promise<string> => {
  return new Promise(resolve => {
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener(
      "loadend",
      () => {
        handleProgress?.(0);
        resolve(reader.result as string);
      },
      false,
    );
    reader.addEventListener("progress", e => {
      const progress = Math.floor((100 * e.loaded) / e.total);
      handleProgress?.(progress);
    });
  });
};
