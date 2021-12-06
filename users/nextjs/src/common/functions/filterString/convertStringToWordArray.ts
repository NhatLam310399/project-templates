export const splitStringToWordsArray = (text: string, character: string) => {
  if (!text) return [];
  const arr = text.split(character);
  return arr.filter(text => text);
}